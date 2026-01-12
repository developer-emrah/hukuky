import { Tabs } from "expo-router";
import { MessageSquare, UploadCloud } from "lucide-react-native";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Asistan",
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Belge Yükle",
          tabBarIcon: ({ color, size }) => <UploadCloud size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
