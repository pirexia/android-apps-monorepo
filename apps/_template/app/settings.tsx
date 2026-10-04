import Constants from 'expo-constants';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../src/theme/colors';

// TODO: reemplazar por la URL real de la política de privacidad de la app.
const PRIVACY_POLICY_URL = 'https://example.com/privacy';

export default function SettingsScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ajustes</Text>
      <Text style={[styles.version, { color: colors.textSecondary }]}>
        Versión {Constants.expoConfig?.version ?? '1.0.0'}
      </Text>
      <Pressable
        accessibilityRole="link"
        onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>Política de privacidad</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  version: { fontSize: 14 },
  button: { borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});
