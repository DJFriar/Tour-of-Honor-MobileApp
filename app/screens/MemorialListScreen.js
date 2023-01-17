import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import apiClient from "../api/client";
import AppPicker from '../components/AppPicker';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import listOfStates from '../config/states';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function MemorialListScreen({ navigation }) {
  const [displayList, setDisplayList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [masterList, setMasterList] = useState();
  const [search, setSearch] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);
  const [stateFiltered, setStateFiltered] = useState();
  const [stateFilteredList, setStateFilteredList] = useState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchMemorialList();
  }, []);

  const fetchMemorialList = () => {
    apiClient.get('/memorials/status/' + user.UserID).then((response) => {
      setStateFilteredList(response.data);
      setDisplayList(response.data);
      setFilteredList(response.data);
      setMasterList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleRefresh = () => {
    setDisplayList(null);
    setFilteredList(null);
    setMasterList(null);
    setSearch(null);
    setStateFiltered(null);
    setStateFilteredList(null);

    fetchMemorialList();
  }

  const handleStateFilter = (selectedState) => {
    if (selectedState) {
      setStateFiltered(selectedState);
      const newData = masterList.filter((item) => {
        return (item.State.toUpperCase().indexOf(selectedState.shortName.toUpperCase()) > -1 );
      });
      setStateFilteredList(newData);
      setDisplayList(newData);
      setSearch(null);
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
      if (stateFiltered) {
        setDisplayList(stateFilteredList);
      } else {
        setFilteredList(filteredList);
      }
      setSearch(text);
    }
  }

  return (
    <Screen style={styles.screen} hasNoHeader>
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
          style={{ height: 18 }}
        />
      </View>
      <FlatList 
        data={displayList}
        ItemSeparatorComponent={ListItemSeperator}
        keyExtractor={memorial => memorial.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={onRefresh}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item}) => 
        <ListItem 
          category={item.CategoryName}
          cityState={item.City +", " + item.State}
          code={item.Code}
          image={item.SampleImage}
          name={item.Name}
          onPress={() => navigation.navigate("MemorialDetailScreen", {id: item.id})}
          status={item.RiderStatus}
        />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  searchRow: {
    alignContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
})

export default MemorialListScreen;
