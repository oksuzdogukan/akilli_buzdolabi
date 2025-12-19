import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen name="index" options={{ title: "Ana Sayfa" }} />

      <Tabs.Screen name="favorites" options={{ title: "Favoriler" }} />

      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
