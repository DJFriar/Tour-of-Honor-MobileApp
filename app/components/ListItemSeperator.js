import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native'

import colors from '../config/colors';

function ListItemSeperator(props) {
  const colorScheme = useColorScheme();
  const themeSeperatorStyle = colorScheme === 'light' ? styles.lightSeperator : styles.darkSeperator;

  return <View style={[styles.seperator, themeSeperatorStyle]}/>;
}

const styles = StyleSheet.create({
  darkSeperator: {
    backgroundColor: colors.darkSeperator,
  },
  lightSeperator: {
    backgroundColor: colors.light,
  },
  seperator: {
    width: '100%',
    height: 1,
  }
})

export default ListItemSeperator;
