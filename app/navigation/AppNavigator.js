import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AccountScreen from '../screens/AccountScreen';
import MemorialsButton from "../navigation/MemorialsButton";
import MemorialNavigator from './MemorialNavigator';
import routes from './routes';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (

  <Tab.Navigator 
    initialRouteName='MemorialNavigator'
  >
    <Tab.Screen name="User Profile" component={AccountScreen} options={{
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
    <Tab.Screen name="Stats" component={StatsScreen} options={{
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chart-bar" color={color} size={size * 1.5} />
    }}/>
  </Tab.Navigator>
)

export default AppNavigator;