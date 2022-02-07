import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';

function StatsScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppText>This the stats screen</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default StatsScreen;