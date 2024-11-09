import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "red" : color} // Change the color to red when focused
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={focused ? "red" : color} // Change the color to red when focused
            />
          ),
        }}
      />
    </Tabs>
  );
}
