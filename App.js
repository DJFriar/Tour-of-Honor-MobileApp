import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';
import CategoryListScreen from './app/screens/CategoryListScreen';
import MemorialNavigator from './app/navigation/MemorialNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import WelcomeScreen from './app/screens/WelcomeScreen';
import MemorialDetailScreen from './app/screens/MemorialDetailScreen';
import MemorialListScreen from './app/screens/MemorialListScreen';

export default function App() {
  return (
    // <WelcomeScreen /> <AppNavigator />
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator />
  </NavigationContainer>
  // <MemorialListScreen />
  );
}
