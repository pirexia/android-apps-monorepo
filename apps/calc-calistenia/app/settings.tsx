import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Linking, StyleSheet, View } from 'react-native';

import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { useTheme } from '../src/theme/colors';
import { spacing } from '../src/theme/tokens';

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
      <ScreenHeader
        title="Ajustes"
        caption={`Versión ${Constants.expoConfig?.version ?? '1.0.0'}`}
      />

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
  container: { flex: 1, padding: spacing.xl, gap: spacing.lg },
});
