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

const LOCALE_COMPARE_OPTS = { sensitivity: 'base' };

function compareMemorialsByLocationAndCategory(a, b) {
  let cmp = String(a.State ?? '').localeCompare(String(b.State ?? ''), undefined, LOCALE_COMPARE_OPTS);
  if (cmp !== 0) return cmp;
  cmp = String(a.City ?? '').localeCompare(String(b.City ?? ''), undefined, LOCALE_COMPARE_OPTS);
  if (cmp !== 0) return cmp;
  return String(a.CategoryName ?? '').localeCompare(String(b.CategoryName ?? ''), undefined, LOCALE_COMPARE_OPTS);
}

function MemorialListScreen({ navigation }) {
  const [masterList, setMasterList] = useState([]);
  const [search, setSearch] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);
  const [stateFiltered, setStateFiltered] = useState();
  const [categoryFiltered, setCategoryFiltered] = useState();
  const [listError, setListError] = useState(null);
  const { user } = useAuth();

  const colorScheme = useColorScheme();
  const themeScreenStyle = colorScheme === 'light' ? styles.lightScreen : styles.darkScreen;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  const categoryPickerItems = useMemo(() => {
    const names = [
      ...new Set(masterList.map((m) => m.CategoryName).filter(Boolean)),
    ];
    names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    return names.map((name, idx) => ({
      value: `cat-${idx}-${name}`,
      fullName: name,
      shortName: name.length > 16 ? `${name.slice(0, 14)}…` : name,
    }));
  }, [masterList]);

  const facetFilteredList = useMemo(() => {
    let list = masterList;
    if (stateFiltered) {
      const sn = stateFiltered.shortName.toUpperCase();
      list = list.filter(
        (item) => item.State.toUpperCase().indexOf(sn) > -1
      );
    }
    if (categoryFiltered) {
      const cat = categoryFiltered.fullName.toUpperCase();
      list = list.filter(
        (item) => (item.CategoryName || '').toUpperCase() === cat
      );
    }
    return list;
  }, [masterList, stateFiltered, categoryFiltered]);

  const displayList = useMemo(() => {
    let filtered = facetFilteredList;
    if (search) {
      const t = search.toUpperCase();
      filtered = facetFilteredList.filter(
        (item) =>
          (item.CategoryName || '').toUpperCase().indexOf(t) > -1 ||
          item.Name.toUpperCase().indexOf(t) > -1 ||
          item.City.toUpperCase().indexOf(t) > -1 ||
          item.Code.toUpperCase().indexOf(t) > -1
      );
    }
    return [...filtered].sort(compareMemorialsByLocationAndCategory);
  }, [facetFilteredList, search]);

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
          setMasterList([]);
          return;
        }
        if (!Array.isArray(response.data)) {
          setListError('Unexpected response from server.');
          setMasterList([]);
          return;
        }
        setMasterList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setListError('Network error while loading memorials.');
        setMasterList([]);
      })
      .finally(() => setOnRefresh(false));
  };

  const handleRefresh = () => {
    setSearch('');
    setStateFiltered(undefined);
    setCategoryFiltered(undefined);
    fetchMemorialList();
  };

  const handleStateFilter = (selectedState) => {
    if (selectedState) {
      setStateFiltered(selectedState);
    }
  };

  const handleCategoryFilter = (selected) => {
    if (selected) {
      setCategoryFiltered(selected);
    }
  };

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
        <AppTextInput
          iconName="search"
          iconFamily="far"
          inputContainerStyle={styles.searchInputContainer}
          value={search}
          placeholder="Search"
          onChangeText={setSearch}
          style={[{ height: 18 }, themeTextStyle]}
        />
      </View>
      <View style={styles.filtersRow}>
        <AppPicker
          clearFilter={() => setStateFiltered(undefined)}
          items={listOfStates}
          onSelectItem={(selectedState) => handleStateFilter(selectedState)}
          placeholder="State"
          selectedItem={stateFiltered}
          style={styles.filterPicker}
        />
        <AppPicker
          clearFilter={() => setCategoryFiltered(undefined)}
          items={categoryPickerItems}
          onSelectItem={(selected) => handleCategoryFilter(selected)}
          placeholder="Category"
          selectedItem={categoryFiltered}
          style={styles.filterPicker}
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
    color: colors.light,
  },
  filterPicker: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 6,
    minWidth: 0,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginHorizontal: 6,
    marginTop: 0,
  },
  lightTextStyle: {
    color: colors.dark,
  },
  lightScreen: {
    backgroundColor: colors.background,
  },
  messageWrap: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  searchInputContainer: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 6,
    minWidth: 0,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 0,
    marginHorizontal: 10,
    marginTop: 0,
  },
});

export default MemorialListScreen;
