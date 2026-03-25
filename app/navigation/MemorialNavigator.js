import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MemorialListScreen from '../screens/MemorialListScreen';
import MemorialDetailScreen from '../screens/MemorialDetailScreen';
import MemorialSubmitScreen from '../screens/MemorialSubmitScreen';

const Stack = createNativeStackNavigator();

const MemorialNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MemorialList" component={MemorialListScreen} />
      <Stack.Screen name="MemorialDetailScreen" component={MemorialDetailScreen} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="MemorialSubmitScreen"
        component={MemorialSubmitScreen}
        options={({ route }) => ({ title: 'Submit ' + route.params.code })}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default MemorialNavigator;
