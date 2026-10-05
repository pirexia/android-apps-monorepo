import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../src/theme/colors';

function externalPolicyUrl(): string | null {
  const configured = Constants.expoConfig?.extra?.privacyPolicyUrl;
  return typeof configured === 'string' && configured.length > 0 ? configured : null;
}

export default function SettingsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const externalUrl = externalPolicyUrl();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ajustes</Text>
      <Text style={[styles.version, { color: colors.textSecondary }]}>
        Versión {Constants.expoConfig?.version ?? '1.0.0'}
      </Text>

      <Pressable
        accessibilityRole="link"
        onPress={() => router.push('/privacy')}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>Política de privacidad</Text>
      </Pressable>

      {externalUrl ? (
        <Pressable
          accessibilityRole="link"
          onPress={() => void Linking.openURL(externalUrl)}
          style={({ pressed }) => [styles.linkButton, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Ver versión web de la política
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  version: { fontSize: 14 },
  button: { borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
  linkButton: { padding: 8, alignItems: 'center' },
  linkText: { fontSize: 15, fontWeight: '600' },
});
