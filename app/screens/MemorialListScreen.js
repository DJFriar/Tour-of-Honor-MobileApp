import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import memorial from '../api/memorial';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';

function MemorialListScreen({ navigation }) {
  const getMemorialListApi = useApi(memorial.getMemorialList);
  const memorials = getMemorialListApi.data;

  useEffect(() => {
    getMemorialListApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.filterRow}>
        <MaterialCommunityIcons name='filter-minus-outline' size={30}/>
        <MaterialCommunityIcons name='filter-menu-outline' size={30}/>
        <MaterialCommunityIcons name='filter-plus-outline' size={30}/>
      </View>
      <FlatList 
        data={memorials}
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