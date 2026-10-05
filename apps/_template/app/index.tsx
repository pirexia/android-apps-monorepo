import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AdBanner } from '../src/components/AdBanner';
import { Card } from '../src/components/ui/Card';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { useTheme } from '../src/theme/colors';

export default function HomeScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Template App"
        caption="Utilidad 100% offline. Sin backend."
      />
      <Card style={styles.card}>
        <Link
          href="/settings"
          accessibilityRole="link"
          style={[styles.link, { color: colors.primary }]}
        >
          Abrir ajustes
        </Link>
      </Card>
      <View style={styles.spacer} />
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  card: { gap: 12 },
  link: { fontSize: 16, fontWeight: '700', paddingVertical: 12 },
  spacer: { flex: 1 },
});
