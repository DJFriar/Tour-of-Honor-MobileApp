import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import categories from '../api/categories';
import CategoryItem from '../components/CategoryItem';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';

function CategoryListScreen({ navigation }) {
  const getCategoriesApi = useApi(categories.getCategories);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  return (
    <Screen style={styles.container}>
      {getCategoriesApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton title="Retry" onPress={getCategoriesApi.request}/>
        </>
      )}
      <FlatList
        data={getCategoriesApi.data}
        keyExtractor={category => category.id.toString()}
        renderItem={({item}) =>
        <CategoryItem
          name={item.Name}
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