import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import AuthNavigator from './app/navigation/AuthNavigator';
import authStorage from './app/auth/storage';
import navigationTheme from './app/navigation/navigationTheme';

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkedAlt, faMapSigns } from '@fortawesome/pro-light-svg-icons';
import { faOctagon, faShieldCheck } from '@fortawesome/pro-solid-svg-icons';
import { faBan, faClock, faImages, faUser } from '@fortawesome/pro-regular-svg-icons';
library.add(faBan, faClock, faImages, faMapMarkedAlt, faMapSigns, faOctagon, faShieldCheck, faUser)

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
