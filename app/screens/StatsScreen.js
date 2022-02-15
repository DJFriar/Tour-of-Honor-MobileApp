import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';

function StatsScreen(props) {
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons name='emoticon-sad-outline' size={100}/>
      <AppText style={styles.text}>This screen is not quite ready yet, but is coming soon.</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.background
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
  }
});

export default StatsScreen;