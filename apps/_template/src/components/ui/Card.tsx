import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

import { useTheme } from '../../theme/colors';
import { radius, shadow, spacing } from '../../theme/tokens';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Contenedor de superficie con "línea clara" (borde 1 px) y sombra suave,
 * montado sobre `Surface` de react-native-paper. La definición la da el borde,
 * no la sombra (tokens.md §0).
 */
export function Card({ children, style }: CardProps) {
  const colors = useTheme();

  return (
    <Surface
      elevation={0}
      style={[
        styles.card,
        shadow.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
});
