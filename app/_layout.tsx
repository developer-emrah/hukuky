import 'expo-dev-client';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/lib/useColorScheme';
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


    <Slot />     
    </>
  )

}




