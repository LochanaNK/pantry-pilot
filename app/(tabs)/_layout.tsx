import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTintColor:'#57534e',
        headerTitleStyle:{
          fontWeight:"bold",
          fontSize:24
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'MY Pantry',
        }}
      />
    </Tabs>
  );
}
