import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, useColorScheme } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
 
function ListItem({cityState, category, code, image, name, onPress, status}) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  const imageURL = "https://images.tourofhonor.com/SampleImages/" + image;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container, themeContainerStyle]}>
        <Image style={styles.image} source={{uri: imageURL}} />
        <View style={styles.detailContainer}>
          <View style={styles.memorialNameContainer}>
            <AppText style={[styles.name, themeTextStyle]} numberOfLines={1}>{name}</AppText>
          </View>
          <View style={styles.row2}>
            <View style={styles.cityStateContainer}>
              <AppText style={[styles.cityState, themeTextStyle]} numberOfLines={1}>{cityState}</AppText>
            </View>
            <View style={styles.statusIconContainer}>
              {status === 2 && <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={20} color={'red'} />}
              {status === 1 && <FontAwesomeIcon icon={['fas', 'shield-check']} size={20} color={'green'} />}
              {(status === 0 && colorScheme === 'light') && <FontAwesomeIcon icon={['far', 'clock']} size={20} /> }
              {(status === 0 && colorScheme === 'dark') && <FontAwesomeIcon icon={['far', 'clock']} size={20} color={'white'} /> }
            </View>
          </View>
          <View style={styles.memorialCode}>
            <AppText style={[styles.memorialCodeText, themeTextStyle]}>{category}</AppText>
            <AppText style={[styles.memorialCodeText, themeTextStyle]}>{code}</AppText>
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
  cityStateContainer: {
    alignItems: 'flex-start',
    flex: 9,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground
  },
  darkTextStyle: {
    color: colors.light
  },
  lightContainer: {
    backgroundColor: colors.white
  },
  lightTextStyle: {
    color: colors.dark
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
  memorialNameContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: "700"
  },
  statusIconContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ListItem;
