import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
    <StatusBar barStyle='light-content' />
      <View style={[styles.view, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1
  }
})

export default Screen;