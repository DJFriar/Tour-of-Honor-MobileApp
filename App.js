import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';

import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/context/authContext';
import AuthNavigator from './app/navigation/AuthNavigator';
import authStorage from './app/auth/storage';
import {tohDarkTheme, tohLightTheme} from './app/navigation/navigationTheme';

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core';
// FontAwesome Pro Light Icons
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { faMapMarkedAlt } from '@fortawesome/pro-light-svg-icons/faMapMarkedAlt';
import { faMapSigns } from '@fortawesome/pro-light-svg-icons/faMapSigns';
// FontAwesome Pro Regular Icons
import { faBan } from '@fortawesome/pro-regular-svg-icons/faBan';
import { faChartBar } from '@fortawesome/pro-regular-svg-icons/faChartBar';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';
import { faClock } from '@fortawesome/pro-regular-svg-icons/faClock';
import { faFrown } from '@fortawesome/pro-regular-svg-icons/faFrown';
import { faImages } from '@fortawesome/pro-regular-svg-icons/faImages';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
// FontAwesome Pro Solid Icons
import { faAnalytics } from '@fortawesome/pro-solid-svg-icons/faAnalytics';
import { faCameraRetro } from '@fortawesome/pro-solid-svg-icons/faCameraRetro';
import { faFlag } from '@fortawesome/pro-solid-svg-icons/faFlag';
import { faLocationDot } from '@fortawesome/pro-solid-svg-icons/faLocationDot';
import { faOctagonExclamation } from '@fortawesome/pro-solid-svg-icons/faOctagonExclamation';
import { faShieldCheck } from '@fortawesome/pro-solid-svg-icons/faShieldCheck';
import { faShieldExclamation } from '@fortawesome/pro-solid-svg-icons/faShieldExclamation';
import { faUser } from '@fortawesome/pro-solid-svg-icons/faUser';
// FontAwesome Library Creation
library.add(
  faAnalytics, faBan, faCameraRetro, faChartBar, faChevronDown, faChevronRight, faClock, faFlag, faFrown, 
  faImages, faLocationDot, faMapMarkedAlt, faMapSigns, faOctagonExclamation, faSearch, faShieldCheck, 
  faShieldExclamation, faTimes, faUser
)

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const scheme = useColorScheme();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme === 'dark' ? tohDarkTheme : tohLightTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
