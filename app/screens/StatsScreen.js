import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';

function StatsScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>This the stats screen</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default StatsScreen;