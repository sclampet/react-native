/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Text, Pressable } from "react-native";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MainTabNavigator from "./MainTabNavigator";
import Colors from "../constants/Colors";
import { View } from "../components/Themed";
import ChatRoom from "../screens/ChatRoomScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "Chat App",
          headerRight: () => (
            <View
              style={{
                width: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <Octicons name="search" size={22} color="#fff" />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color="#fff"
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                width: 100,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <Pressable onPress={() => console.warn("video icon pressed")}>
                <FontAwesome5 name="video" size={22} color="#fff" />
              </Pressable>
              <Pressable onPress={() => console.warn("call icon pressed")}>
                <MaterialIcons name="call" size={22} color="#fff" />
              </Pressable>
              <Pressable onPress={() => console.warn("dots icon pressed")}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={22}
                  color="#fff"
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
