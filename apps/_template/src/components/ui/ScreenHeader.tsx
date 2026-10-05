import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/colors';
import { spacing, typography } from '../../theme/tokens';

interface ScreenHeaderProps {
  title: string;
  caption?: string;
}

/**
 * Cabecera de pantalla reutilizable: título + subtítulo opcional de una línea.
 * Sigue el patrón de pantalla común (`docs/design-system/app-pattern.md`).
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
  container: { gap: spacing.xs },
  title: { ...typography.title },
  caption: { ...typography.caption },
});
