import React from 'react';

import AppNavigator from './app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';

export default function App() {
  return (
    // <WelcomeScreen /> <AppNavigator />
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator />
  </NavigationContainer>
  // <MemorialListScreen />
  );
}
