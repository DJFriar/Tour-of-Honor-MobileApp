import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import colors from '../config/colors';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';

const initialMemorials = [
  {
    id: 1,
    category: 'Tour of Honor',
    code: 'TX2',
    name: 'Central Texas Veterans Memorial',
    cityState: 'Brownwood, TX',
    image: require('../assets/MTr001.jpg')
  },
  {
    id: 2,
    category: 'Gold Star Family',
    code: 'GSF17',
    name: 'GSF New York',
    cityState: 'New York City, NY',
    image: require('../assets/MTr002.jpg')
  },
  {
    id: 3,
    category: 'Tour of Honor',
    code: 'TX7',
    name: 'Veterans Memorial',
    cityState: 'Wills Point, TX',
    image: require('../assets/MTr003.jpg')
  },
  {
    id: 4,
    category: 'Huey',
    code: 'H238',
    name: '59-09641 UH-1A',
    cityState: 'Springfield, IL',
    image: require('../assets/MTr004.jpg')
  },
  {
    id: 5,
    category: 'War Dogs',
    code: 'K9108',
    name: 'Steelworkers Memorial',
    cityState: 'Coatesville, PA',
    image: require('../assets/MTr005.jpg')
  }
]

function MemorialListScreen() {
  const [memorials, setMemorials] = useState(initialMemorials);

  return (
    <Screen style={styles.screen}>
      <FlatList 
        data={memorials}
        keyExtractor={memorial => memorial.id.toString()}
        renderItem={({item}) => 
        <ListItem 
          category={item.category}
          cityState={item.cityState}
          code={item.code}
          image={item.image}
          name={item.name}
          onPress={() => console.log("Memorial selected", item)}
        />}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background
  }
})

export default MemorialListScreen;