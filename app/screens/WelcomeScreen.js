import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import * as Linking from 'expo-linking';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';

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
        <AppButton title="Register" color="secondary" onPress={() => Linking.openURL(REGISTER_URL)}/>
        <AppButton title="Login" color="blue" onPress={() => navigation.navigate(routes.LOGIN)}/>
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
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20
  }
});
