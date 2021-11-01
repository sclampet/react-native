import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator
              screenOptions={{
                gestureDirection: 'horizontal',
              }}
            >
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen} options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen} options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
            {/* <HomeScreen /> */}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
