import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { useTheme } from '../src/theme/colors';
import { usePaperTheme } from '../src/theme/paperTheme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = useTheme();
  const paperTheme = usePaperTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
      </Stack>
    </PaperProvider>
  );
}
