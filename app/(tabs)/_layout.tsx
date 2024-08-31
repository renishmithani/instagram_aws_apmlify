import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <MaterialIcons
                  name={focused ? "home-filled" : "home"}
                  size={30}
                  color="black"
                />
              ) : (
                <Octicons name="home" size={24} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome name="search" size={28} color="black" />
              ) : (
                <Feather name="search" size={28} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <AntDesign name="plussquare" size={26} color="black" />
              ) : (
                <AntDesign name="plussquareo" size={26} color="black" />
              ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome name="heart" size={26} color="black" />
              ) : (
                <Feather name="heart" size={26} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings-sharp" : "settings-outline"}
                size={28}
                color="black"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
