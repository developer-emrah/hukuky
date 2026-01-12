import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    // SafeAreaProvider: Çentikli telefonlarda (iPhone X ve üstü) içeriğin kaymasını yönetir
    <SafeAreaProvider>
      {/* StatusBar: Telefonun en üstündeki saat/pil göstergeleri.
        Uygulamamız koyu renk (Dark Mode) olduğu için ikonları beyaz ('light') yapıyoruz.
      */}
      <StatusBar style="light" />

      {/* Stack: Sayfaların üst üste binme mantığını yönetir.
        Burada genel ayarları yapıyoruz.
      */}
      <Stack
        screenOptions={{
          headerShown: false, // Expo'nun varsayılan beyaz başlığını gizle
          contentStyle: { backgroundColor: "#0f172a" }, // Global arka plan rengi (Slate-900 ile aynı)
          animation: "fade", // Sayfa geçiş animasyonu (İsteğe bağlı)
        }}
      >
        {/* (tabs) klasörünü bir "Screen" olarak tanımlıyoruz.
          Böylece uygulama açıldığında expo-router otomatik olarak burayı tanıyor.
        */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
