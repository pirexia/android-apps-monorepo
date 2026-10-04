import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AdBanner } from '../src/components/AdBanner';
import { useTheme } from '../src/theme/colors';

export default function HomeScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Template App</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Utilidad 100% offline. Sin backend.
      </Text>
      <Link href="/settings" style={[styles.link, { color: colors.primary }]}>
        Abrir ajustes
      </Link>
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, textAlign: 'center' },
  link: { fontSize: 16, fontWeight: '600' },
});
