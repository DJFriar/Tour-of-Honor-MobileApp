import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

import colors from '../config/colors';

function MemorialsButton({ onPress }) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, themeContainerStyle]}>
        <Image style={styles.icon} source={require('../assets/toh_logo.png')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 40,
    bottom: Platform.OS === "android" ? 30 : 20,
    justifyContent: 'flex-start',
    // opacity: .6, -- Would be nice to set this on active/inactive state, but not urgent.
  },
  darkContainer: {
    borderColor: colors.black,
  },
  lightContainer: {
    borderColor: colors.white,
  },
  icon: {
    height: 80,
    width: 80
  }
});

export default MemorialsButton;
