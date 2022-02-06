import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import apiClient from "../api/client";
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
// import memorial from '../api/memorial';
import Screen from '../components/Screen';
// import useApi from '../hooks/useApi';

function MemorialListScreen({ navigation }) {
  const [filteredList, setFilteredList] = useState();
  const [masterList, setMasterList] = useState();
  const [search, setSearch] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);
  
  // const getMemorialListApi = useApi(memorial.getMemorialList);
  // const memorials = getMemorialListApi.data;

  useEffect(() => {
    fetchMemorialList();
  }, []);

  const fetchMemorialList = () => {
    apiClient.get('/memorial-list').then((response) => {
      setFilteredList(response.data);
      setMasterList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleRefresh = () => {
    setFilteredList(null);
    setMasterList(null);
    setSearch(null);

    fetchMemorialList();
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterList.filter((item) => {
        return (item.CategoryName.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
        item.Name.toUpperCase().indexOf(text.toUpperCase()) > -1 || 
        item.City.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
        item.Code.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
        item.State.toUpperCase().indexOf(text.toUpperCase()) > -1 );
      });
      setFilteredList(newData);
      setSearch(text);
    } else {
      setFilteredList(masterList);
      setSearch(text);
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.searchRow}>
        <AppTextInput 
          icon="magnify" 
          value={search} 
          placeholder="Search" 
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <FlatList 
        data={filteredList}
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
        />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background
  },
  searchRow: {
    marginHorizontal: 10
  }
})

export default MemorialListScreen;