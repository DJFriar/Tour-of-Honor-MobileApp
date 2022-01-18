import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';

function MemorialDetailScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText>Memorial Details go here.</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  }
});

export default MemorialDetailScreen;