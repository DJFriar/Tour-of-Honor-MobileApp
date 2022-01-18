import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import CategoryListScreen from './app/screens/CategoryListScreen';

export default function App() {
  return (
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator />
  </NavigationContainer>
  );
}
