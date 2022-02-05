import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import * as Yup from 'yup';


function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>To configure your app</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default LoginScreen;