import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MemorialListScreen from '../screens/MemorialListScreen';
import MemorialDetailScreen from '../screens/MemorialDetailScreen';

const Stack = createStackNavigator();
console.log("==== MemorialNavigator ====");

const MemorialNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="MemorialList" component={MemorialListScreen} />
    <Stack.Screen name="MemorialDetailScreen" component={MemorialDetailScreen} />
  </Stack.Navigator>
)

export default MemorialNavigator;