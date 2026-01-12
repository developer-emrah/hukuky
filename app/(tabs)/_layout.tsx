import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Üst başlıkları gizle (Ekranlarda kendimiz yaparız)
        tabBarStyle: {
          backgroundColor: "#0f172a", // Koyu Lacivert (Slate-900)
          borderTopColor: "#1e293b",
          height: 90,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#3b82f6", // Aktif ikon mavi
        tabBarInactiveTintColor: "#64748b", // Pasif ikon gri
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: "600",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hukuk Asistanı',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Mevzuat Yükle',
          tabBarIcon: ({ color, size }) => <Ionicons name="cloud-upload-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}