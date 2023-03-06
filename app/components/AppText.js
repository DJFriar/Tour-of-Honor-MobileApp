import React from 'react';
import { Platform, StyleSheet, Text, useColorScheme } from 'react-native';

import colors from '../config/colors';

function AppText({children, style, ...otherProps }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  return (
    <Text style={[styles.text, themeTextStyle, style]} {...otherProps } maxFontSizeMultiplier={1}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  darkText: {
    color: colors.white,
  },
  lightText: {
    color: colors.dark,
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto": "Avenir"
  },
})

export default AppText;
