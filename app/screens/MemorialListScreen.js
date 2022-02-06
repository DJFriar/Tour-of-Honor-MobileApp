import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import memorial from '../api/memorial';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';

function MemorialListScreen({ navigation }) {
  const [filteredList, setFilteredList] = useState();
  const [masterList, setMasterList] = useState();
  const [search, setSearch] = useState('');
  
  const getMemorialListApi = useApi(memorial.getMemorialList);
  const memorials = getMemorialListApi.data;

  useEffect(() => {
    getMemorialListApi.request();
    setFilteredList(memorials);
    setMasterList(memorials);
  }, []);

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

  // Filter memorials when the icons below are tapped.
  // TODO: replace the icons below with the new TappableIcons component

  return (
    <Screen style={styles.screen}>
      {/* <View style={styles.filterRow}>
        <MaterialCommunityIcons name='filter-minus-outline' size={30}/>
        <MaterialCommunityIcons name='filter-menu-outline' size={30}/>
        <MaterialCommunityIcons name='filter-plus-outline' size={30}/>
      </View> */}
      <AppTextInput 
        icon="magnify" 
        value={search} 
        placeholder="Search" 
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList 
        data={filteredList}
        keyExtractor={memorial => memorial.id.toString()}
        renderItem={({item}) => 
        <ListItem 
          category={item.CategoryName}
          cityState={item.City +", " + item.State}
          code={item.Code}
          image={item.SampleImage}
          name={item.Name}
          onPress={() => navigation.navigate("MemorialDetailScreen", {id: item.id})}
        />}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  screen: {
    backgroundColor: colors.background
  }
})

export default MemorialListScreen;