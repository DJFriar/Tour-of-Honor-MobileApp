import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StatsScreen from '../screens/StatsScreen';

const Stack = createStackNavigator();

const StatsNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StatsDetail" component={StatsScreen} />
  </Stack.Navigator>
)

export default StatsNavigator;