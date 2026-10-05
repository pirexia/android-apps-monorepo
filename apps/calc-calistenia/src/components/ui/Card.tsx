import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/colors';
import { radius, shadow, spacing } from '../../theme/tokens';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Contenedor de superficie con "línea clara" (borde 1 px) y sombra suave.
 */
export function Card({ children, style }: CardProps) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.card,
        shadow.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
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
