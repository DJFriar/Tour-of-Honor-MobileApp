import React from 'react';
import { Platform, StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import * as Linking from 'expo-linking';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import AppText from '../components/AppText';

const REGISTER_URL = 'https://www.tourofhonor.com/pages/register.html';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      blurRadius={7}
      style={styles.background} 
      source={require('../assets/background.jpg')} 
      resizeMode='cover' >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/toh_logo.png')} ></Image>
        {/* <Text style={styles.tagline}>Ride to Remember</Text> */}
      </View>
    
      <View style={styles.buttonsContainer}>
      {(Platform.OS === 'android') ? 
        <>
          <AppButton title="Register" color="secondary" onPress={() => Linking.openURL(REGISTER_URL)}/>
          <AppButton title="Login" color="blue" onPress={() => navigation.navigate(routes.LOGIN)}/>
        </> : <>
          <View style={styles.loginNoticeContainer}>
            <AppText style={styles.loginNotice}>This app is only for registered 2022 Tour of Honor participants.</AppText>
            <AppText style={styles.loginNotice}>Please click below to login.</AppText>
          </View>
          <AppButton title="Login" color="blue" onPress={() => navigation.navigate(routes.LOGIN)}/>
        </>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 20,
    width: "100%"
  },
  background: {
    backgroundColor: colors.background,
    flex: 1, 
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  logoContainer: {
    position: "absolute",
    top: 120,
    alignItems: "center"
  },
  loginNotice: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  loginNoticeContainer: {
    backgroundColor: '#6e696980',
    borderRadius: 15,
    marginBottom: 50,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20
  }
});
