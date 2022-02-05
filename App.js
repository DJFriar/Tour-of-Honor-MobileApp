import React, { useState } from 'react';
import {View} from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import Screen from './app/components/Screen';
import ImageInputList from './app/components/ImageInputList';
import AppFormImagePicker from './app/components/forms/AppFormImagePicker';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';

export default function App() {

  return (
    <LoginScreen />
    // <WelcomeScreen />
  // <NavigationContainer theme={navigationTheme}>
  //   <AppNavigator />
  // </NavigationContainer>
  );
}
