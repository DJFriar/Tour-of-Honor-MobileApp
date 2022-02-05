import React, { useState } from 'react';
import {View} from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import Screen from './app/components/Screen';
import ImageInputList from './app/components/ImageInputList';
import AppFormImagePicker from './app/components/AppFormImagePicker';

export default function App() {

  return (
    // <WelcomeScreen /> <AppNavigator />
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator />
  </NavigationContainer>
  );
}
