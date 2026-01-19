import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffedd5",
        },
        headerTintColor: "#ea580c",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
        tabBarStyle: {
          backgroundColor: "#ffedd5",
        },
        tabBarInactiveTintColor: "#57534e",
        tabBarActiveTintColor: "#ea580c",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon:({color,focused})=>(
            <Ionicons name="fast-food-sharp" size={24} color={focused? "#ea580c" : "#57534e"} />
          )
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: "MY Pantry",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="clipboard-list" size={24} color={focused? "#ea580c" : "#57534e"} />
          ),
        }}
      />
    </Tabs>
  );
}
