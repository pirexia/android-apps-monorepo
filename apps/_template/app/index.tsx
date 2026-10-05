import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AdBanner } from '../src/components/AdBanner';
import { Card } from '../src/components/ui/Card';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { useTheme } from '../src/theme/colors';
import { spacing, typography } from '../src/theme/tokens';

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
          style={[styles.link, { color: colors.primaryText }]}
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
  container: { flex: 1, padding: spacing.xl, gap: spacing.lg },
  card: { gap: spacing.md },
  link: { ...typography.bodyStrong, paddingVertical: spacing.md },
  spacer: { flex: 1 },
});
