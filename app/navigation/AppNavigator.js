import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AccountNavigator from './AccountNavigator';
import MemorialsButton from "../navigation/MemorialsButton";
import routes from './routes';
import MemorialListScreen from '../screens/MemorialListScreen';
import StatsNavigator from './StatsNavigator';
import MemorialNavigator from './MemorialNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (

  <Tab.Navigator>
    <Tab.Screen name="Account" component={AccountNavigator} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size * 1.5} />
    }} />
    <Tab.Screen 
      name="MemorialNavigator" 
      component={MemorialNavigator} 
      options={({ navigation }) => ({
        headerShown: false,
        tabBarButton: () => <MemorialsButton onPress={() => navigation.navigate(routes.MEMORIAL_LIST)}/>,
      })}
    />
    <Tab.Screen name="Stats" component={StatsNavigator} options={{
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chart-bar" color={color} size={size * 1.5} />
    }}/>
  </Tab.Navigator>
)

export default AppNavigator;