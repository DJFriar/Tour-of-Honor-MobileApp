import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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
    <Tab.Screen name="Profile" component={AccountScreen} options={{
      tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={['fas', 'user']} color={color} size={size * 1.3} />
    }} />
    <Tab.Screen
      name="MemorialNavigator"
      component={MemorialNavigator}
      options={({ navigation }) => ({
        headerShown: false,
        tabBarButton: () => <MemorialsButton onPress={() => navigation.navigate(routes.MEMORIAL_LIST)} />,
      })}
    />
    <Tab.Screen name="History" component={StatsScreen} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={['fas', 'analytics']} color={color} size={size * 1.3} />
    }} />
  </Tab.Navigator>
)

export default AppNavigator;
