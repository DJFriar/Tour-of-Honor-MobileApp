import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AccountNavigator from './AccountNavigator';
import MemorialsButton from "../navigation/MemorialsButton";
import routes from './routes';
import MemorialListScreen from '../screens/MemorialListScreen';
import StatsNavigator from './StatsNavigator';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (

  <Tab.Navigator>
    <Tab.Screen name="Account" component={AccountNavigator} options={{
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />
    }} />
    <Tab.Screen 
      name="MemorialList" 
      component={MemorialListScreen} 
      options={({ navigation }) => ({
        headerShown: false,
        tabBarButton: () => <MemorialsButton onPress={() => navigation.navigate(routes.MEMORIAL_LIST)}/>,
      })}
    />
    <Tab.Screen name="Stats" component={StatsNavigator} options={{
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />
    }}/>
  </Tab.Navigator>
)

export default AppNavigator;