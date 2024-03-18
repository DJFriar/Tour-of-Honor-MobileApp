import React from 'react';
import { Platform, StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from '../config/colors';

function AppTextInput({ iconName, iconFamily, height, ...otherProps }) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  return (
    <View style={[styles.container, themeContainerStyle, {height: height}]}>
      <View style={styles.iconContainer}>
        {iconName && <FontAwesomeIcon icon={[iconFamily, iconName]} size={20} color={colors.medium} />}
      </View>
      <View style={[styles.textContainer, themeContainerStyle]}>
        <TextInput placeholderTextColor={colors.medium} style={[styles.text, themeTextStyle]} {...otherProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 25,
    flex: 4,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground
  },
  darkTextStyle: {
    color: colors.light
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer:{
    marginHorizontal: 10,
  },
  lightContainer: {
    backgroundColor: colors.white
  },
  lightTextStyle: {
    color: colors.dark
  },
  text: {
    fontFamily: Platform.OS === "android" ? "Roboto": "Avenir",
  },
  textContainer: {
    flex: 1,
  }
})

export default AppTextInput;
