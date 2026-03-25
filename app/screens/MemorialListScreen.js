import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, RefreshControl, StyleSheet, useColorScheme, View } from 'react-native';

import apiClient from "../api/client";
import AppPicker from '../components/AppPicker';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import listOfStates from '../config/states';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function MemorialListScreen({ navigation }) {
  const [displayList, setDisplayList] = useState([]);
  /** Kept in sync with masterList (legacy name used by some code paths / refresh flows). */
  const [filteredList, setFilteredList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [search, setSearch] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);
  const [stateFiltered, setStateFiltered] = useState();
  const [stateFilteredList, setStateFilteredList] = useState([]);
  const [listError, setListError] = useState(null);
  const { user } = useAuth();

  const colorScheme = useColorScheme();
  const themeScreenStyle = colorScheme === 'light' ? styles.lightScreen : styles.darkScreen;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  useEffect(() => {
    if (user?.UserID == null) return;
    fetchMemorialList();
  }, [user?.UserID]);

  const fetchMemorialList = () => {
    if (user?.UserID == null) return;
    setListError(null);
    setOnRefresh(true);
    apiClient
      .get('/memorials/status/' + user.UserID)
      .then((response) => {
        if (!response.ok) {
          const msg =
            response.data?.message ||
            response.data?.error ||
            `Could not load memorials (HTTP ${response.status}).`;
          setListError(String(msg));
          setStateFilteredList([]);
          setDisplayList([]);
          setFilteredList([]);
          setMasterList([]);
          return;
        }
        if (!Array.isArray(response.data)) {
          setListError('Unexpected response from server.');
          setStateFilteredList([]);
          setDisplayList([]);
          setFilteredList([]);
          setMasterList([]);
          return;
        }
        setStateFilteredList(response.data);
        setDisplayList(response.data);
        setFilteredList(response.data);
        setMasterList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setListError('Network error while loading memorials.');
        setStateFilteredList([]);
        setDisplayList([]);
        setFilteredList([]);
        setMasterList([]);
      })
      .finally(() => setOnRefresh(false));
  };

  const handleRefresh = () => {
    setSearch('');
    setStateFiltered(null);
    fetchMemorialList();
  };

  const handleStateFilter = (selectedState) => {
    if (selectedState) {
      setStateFiltered(selectedState);
      const newData = masterList.filter((item) => {
        return (item.State.toUpperCase().indexOf(selectedState.shortName.toUpperCase()) > -1 );
      });
      setStateFilteredList(newData);
      setDisplayList(newData);
      setSearch('');
    } 
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = stateFilteredList.filter((item) => {
        return (item.CategoryName.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
        item.Name.toUpperCase().indexOf(text.toUpperCase()) > -1 || 
        item.City.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
        item.Code.toUpperCase().indexOf(text.toUpperCase()) > -1 );
      });
      setDisplayList(newData);
      setSearch(text);
    } else {
      setDisplayList(stateFiltered ? stateFilteredList : filteredList);
      setSearch(text);
    }
  }

  const onNavigateToMemorial = useCallback(
    (id) => navigation.navigate('MemorialDetailScreen', { id }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ListItem
        category={item.CategoryName}
        cityState={item.City + ', ' + item.State}
        code={item.Code}
        colorScheme={colorScheme}
        image={item.SampleImage}
        memorialId={item.id}
        name={item.Name}
        onNavigateToMemorial={onNavigateToMemorial}
        status={item.RiderStatus}
      />
    ),
    [colorScheme, onNavigateToMemorial]
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const listEmpty = useMemo(
    () =>
      !listError ? (
        <View style={styles.messageWrap}>
          <AppText style={themeTextStyle}>No memorials to show.</AppText>
        </View>
      ) : null,
    [listError, themeTextStyle]
  );

  return (
    <Screen style={themeScreenStyle} hasNoHeader>
      <View style={styles.searchRow}>
        <AppPicker 
          clearFilter={() => {
            handleRefresh();
          }}
          items={listOfStates}
          // numberOfColumns={5}
          onSelectItem={(selectedState) => handleStateFilter(selectedState)}
          placeholder="All"
          selectedItem={stateFiltered}
          style={styles.statePicker}
        />
        <AppTextInput 
          iconName="search" 
          iconFamily="far"
          value={search} 
          placeholder="Search" 
          onChangeText={(text) => searchFilter(text)}
          style={[{ height: 18 }, themeTextStyle]}
        />
      </View>
      {listError ? (
        <View style={styles.messageWrap}>
          <AppText style={themeTextStyle}>{listError}</AppText>
        </View>
      ) : null}
      <FlatList 
        data={displayList}
        initialNumToRender={14}
        ItemSeparatorComponent={ListItemSeperator}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmpty}
        maxToRenderPerBatch={12}
        removeClippedSubviews={Platform.OS === 'android'}
        refreshControl={
          <RefreshControl 
            refreshing={onRefresh}
            onRefresh={handleRefresh}
          />
        }
        renderItem={renderItem}
        updateCellsBatchingPeriod={50}
        windowSize={10}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  darkScreen: {
    backgroundColor: colors.black,
  },
  darkTextStyle: {
    color: colors.light
  },
  lightTextStyle: {
    color: colors.dark
  },
  lightScreen: {
    backgroundColor: colors.background,
  },
  searchRow: {
    alignContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  messageWrap: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
})

export default MemorialListScreen;
