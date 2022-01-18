import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

function ListItem({cityState, category, code, image, name, onPress}) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailContainer}>
          <View style={styles.memorialDetails}>
            <AppText style={styles.name} numberOfLines={1}>{name}</AppText>
            <AppText style={styles.cityState} numberOfLines={1}>{cityState}</AppText>
          </View>
          <View style={styles.memorialCode}>
            <AppText style={styles.memorialCodeText}>{category}</AppText>
            <AppText style={styles.memorialCodeText}>{code}</AppText>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  cityState: {
    fontWeight: "400"
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white
  },
  detailContainer: {
    flex: 1,
    marginLeft: 10,
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
  name: {
    fontSize: 20,
    fontWeight: "700"
  }
});

export default ListItem;