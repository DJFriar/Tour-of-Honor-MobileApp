import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';

import colors from '../config/colors';

function MiniHeading({children, style, ...otherProps }) {
  const colorScheme = useColorScheme();
  const themeHeadingStyle = colorScheme === 'light' ? styles.lightHeading : styles.darkHeading;
  
  return (
    <Text style={[styles.miniHeading, themeHeadingStyle, style]} {...otherProps }>{children}</Text>
  );
}

const styles = StyleSheet.create({
  darkHeading: {
    color: colors.white,
  },
  lightHeading: {
    color: colors.dark,
  },
  miniHeading: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 2,
  },
})

export default MiniHeading;
