import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppText from './AppText';
import colors from '../config/colors';

function CategoryItem({name, onPress}) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <AppText style={styles.category}>{name}</AppText>
        </View>
        <FontAwesomeIcon icon={['far', 'chevron-right']} size={25} color={colors.medium} />
        {/* <MaterialCommunityIcons color={colors.medium} name="chevron-right" size={25} /> */}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white
  },
  detailContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  memorialCode: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  memorialCodeText: {
    fontSize: 16,
    fontWeight: "400",
  },
  memorialDetails: {
    flex: 1,
  },
  category: {
    fontSize: 20,
    fontWeight: "400"
  }
});

export default CategoryItem;