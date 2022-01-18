import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';

function AccountScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>This is the Account Page</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default AccountScreen;