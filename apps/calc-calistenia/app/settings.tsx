import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
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

      <Card>
        <Button label="Política de privacidad" onPress={() => router.push('/privacy')} />
        {externalUrl ? (
          <Button
            label="Ver versión web de la política"
            variant="ghost"
            accessibilityRole="link"
            onPress={() => void Linking.openURL(externalUrl)}
          />
        ) : null}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: '800' },
  version: { fontSize: 14 },
});
