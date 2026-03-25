import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StatsScreen from '../screens/StatsScreen';

const Stack = createNativeStackNavigator();

const StatsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'modal',
    }}
  >
    <Stack.Screen name="StatsDetail" component={StatsScreen} />
  </Stack.Navigator>
);

export default StatsNavigator;
