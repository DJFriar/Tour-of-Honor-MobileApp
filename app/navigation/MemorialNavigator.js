import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MemorialListScreen from '../screens/MemorialListScreen';
import MemorialDetailScreen from '../screens/MemorialDetailScreen';
import MemorialSubmitScreen from '../screens/MemorialSubmitScreen';

const Stack = createStackNavigator();

const MemorialNavigator = () => (
  <Stack.Navigator>
  <Stack.Group
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="MemorialList" component={MemorialListScreen} />
    <Stack.Screen name="MemorialDetailScreen" component={MemorialDetailScreen} />
  </Stack.Group>
  <Stack.Group screenOptions={{ presentation: 'modal' }}>
    <Stack.Screen name="MemorialSubmitScreen" component={MemorialSubmitScreen} options={({route}) => ({ title: 'Submit ' + route.params.code })} />
  </Stack.Group>

  </Stack.Navigator>
)

export default MemorialNavigator;