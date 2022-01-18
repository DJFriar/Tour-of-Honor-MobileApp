import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="AccountDetails" component={AccountScreen} />
  </Stack.Navigator>
)

export default AccountNavigator;