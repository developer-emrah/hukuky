// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import colors from 'tailwindcss/colors'; // Tailwind renklerine erişim

// Tailwind config'de tanımladığımız renkleri manuel alalım (JS tarafında kullanmak için)
const legalColors = {
  dark: '#1E293B',
  bg: '#F8FAFC',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: legalColors.dark,
        tabBarInactiveTintColor: colors.slate[400],
        tabBarStyle: {
            backgroundColor: legalColors.bg,
            borderTopColor: colors.slate[200],
            elevation: 0, // Android gölgeyi kaldır
            shadowOpacity: 0, // iOS gölgeyi kaldır
            height: 60,
            paddingBottom: 5,
        },
        headerStyle: {
            backgroundColor: legalColors.bg,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.slate[200],
        },
        headerTitleStyle: {
            fontWeight: '600',
            color: legalColors.dark,
            fontSize: 18,
        },
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hukuk Asistanı',
          tabBarLabel: 'Asistan',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Mevzuat Yükle',
          tabBarLabel: 'Yükle',
          tabBarIcon: ({ color, size }) => <Ionicons name="cloud-upload-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}