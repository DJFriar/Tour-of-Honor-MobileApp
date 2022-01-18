import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MemorialListScreen from '../screens/MemorialListScreen';
import MemorialDetailScreen from '../screens/MemorialDetailScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="MemorialList" component={MemorialListScreen} />
    <Stack.Screen name="MemorialListDetail" component={MemorialDetailScreen} />
  </Stack.Navigator>
)

export default AccountNavigator;