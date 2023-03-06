import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';
import settings from '../config/settings';

function Screen({ children, style, hasNoHeader }) {
  const colorScheme = useColorScheme();
  const themeScreenStyle = colorScheme === 'light' ? styles.lightScreen : styles.darkScreen;

  const edges = ['left', 'right']
  if (hasNoHeader) {
    edges.push('top')
  }

  return (
    <SafeAreaView style={[styles.screen, themeScreenStyle, style]} edges={edges}>
      <StatusBar/>
      <View style={{backgroundColor: settings.statusBarColor, height: 6}} />
      <View style={[styles.view, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkScreen: {
    backgroundColor: colors.black,
  },
  lightScreen: {
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
  view: {
    flex: 1
  }
})

export default Screen;
