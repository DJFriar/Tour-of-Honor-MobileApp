import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import Screen from '../components/Screen';
import CategoryItem from '../components/CategoryItem';
import routes from '../navigation/routes';

const initialCategories = [
  {
    id: 2,
    label: "9/11"
  },
  {
    id: 3,
    label: "Doughboys"
  },
  {
    id: 4,
    label: "Gold Star Family"
  },
  {
    id: 5,
    label: "Hueys"
  },
  {
    id: 6,
    label: "Madonna Trail"
  },
  {
    id: 7,
    label: "War Dogs / K9"
  },
  {
    id: 1,
    label: "Tour of Honor"
  },
]

function CategoryListScreen({ navigation }) {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={category => category.id.toString()}
        renderItem={({item}) =>
        <CategoryItem
          name={item.label}
          onPress={() => navigation.navigate(routes.MEMORIAL_LIST)}
        />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  }
});

export default CategoryListScreen;