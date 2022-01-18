import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import CategoryListScreen from './app/screens/CategoryListScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <WelcomeScreen />
  // <NavigationContainer theme={navigationTheme}>
  //   <AppNavigator />
  // </NavigationContainer>
  );
}
