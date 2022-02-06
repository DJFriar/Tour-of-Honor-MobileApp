import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AccountNavigator from './AccountNavigator';
import MemorialsButton from "../navigation/MemorialsButton";
import MemorialNavigator from './MemorialNavigator';
import routes from './routes';
import StatsNavigator from './StatsNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (

  <Tab.Navigator 
    barStyle={{ paddingBottom: 48 }}
    initialRouteName='MemorialNavigator'
  >
    <Tab.Screen name="User Profile" component={AccountNavigator} options={{
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