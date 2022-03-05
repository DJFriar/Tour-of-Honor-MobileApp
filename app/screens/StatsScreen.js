import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';

function StatsScreen(props) {
  return (
    <Screen style={styles.container}>
      <FontAwesomeIcon icon={['far', 'frown']} size={90} />
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
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  }
});

export default StatsScreen;