import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initializeAds } from '../src/lib/ads';
import { useTheme } from '../src/theme/colors';

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = useTheme();

  useEffect(() => {
    void initializeAds();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Calculadora de Calistenia' }} />
        <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
        <Stack.Screen name="privacy" options={{ title: 'Política de privacidad' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
