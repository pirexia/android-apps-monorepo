import Constants from 'expo-constants';
import { Linking, StyleSheet, View } from 'react-native';

import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { useTheme } from '../src/theme/colors';

// TODO: reemplazar por la URL real de la política de privacidad de la app.
const PRIVACY_POLICY_URL = 'https://example.com/privacy';

export default function SettingsScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Ajustes"
        caption={`Versión ${Constants.expoConfig?.version ?? '1.0.0'}`}
      />
      <Card>
        <Button
          label="Política de privacidad"
          accessibilityRole="link"
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
});
