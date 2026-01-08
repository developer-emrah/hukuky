import 'expo-dev-client';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();


  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Slot />
      </NavThemeProvider>
    </>
  )

}




