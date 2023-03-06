import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';

import colors from '../config/colors';

function MetaHeading({children, style, ...otherProps }) {
  const colorScheme = useColorScheme();
  const themeHeadingStyle = colorScheme === 'light' ? styles.lightHeading : styles.darkHeading;
  
  return (
    <Text style={[styles.heading, themeHeadingStyle, style]} {...otherProps }>{children}</Text>
  );
}

const styles = StyleSheet.create({
  darkHeading: {
    color: colors.white,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    paddingTop: 10,
  },
  lightHeading: {
    color: colors.dark,
  },
})

export default MetaHeading;
