import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{tabBarActiveTintColor: '#f15454', headerShown: false}}>
      <Tab.Screen name={'Stats'} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
