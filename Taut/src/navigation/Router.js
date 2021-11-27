import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Home'} component={HomeTabNavigator} />

        {/* <Stack.Screen
          name={'Destination Search'}
          component={DestinationScreen}
          options={{title: 'Search your destination', headerShown: true}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
