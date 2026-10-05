import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/colors';

interface ScreenHeaderProps {
  title: string;
  caption?: string;
}

/**
 * Cabecera de pantalla reutilizable: título + subtítulo opcional de una línea.
 * Sigue el patrón de pantalla común (`docs/design-system/app-pattern.md`).
 * Tipografía: `title` (26/800) + `caption` (12/400, `textSecondary`).
 */
export function ScreenHeader({ title, caption }: ScreenHeaderProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      <Text
        accessibilityRole="header"
        style={[styles.title, { color: colors.text }]}
      >
        {title}
      </Text>
      {caption ? (
        <Text style={[styles.caption, { color: colors.textSecondary }]}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 4 },
  title: { fontSize: 26, fontWeight: '800', lineHeight: 32 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
});
