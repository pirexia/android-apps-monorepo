import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme/colors';
import { radius, shadow, spacing, typography } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  accessibilityRole?: 'button' | 'link';
  style?: StyleProp<ViewStyle>;
}

/**
 * Botón moderno "soft": formas redondeadas (radio `lg`) y alto ≥ 52.
 * - primary: relleno pastel `primary` + tinta `onPrimary`.
 * - secondary: relleno `primarySoft` + tinta `primaryText`.
 * - ghost: fondo transparente + borde `border` + tinta `primaryText`.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  accessibilityRole = 'button',
  style,
}: ButtonProps) {
  const colors = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.primarySoft
        : 'transparent';

  const borderColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.primaryBorder
        : colors.border;

  const labelColor = variant === 'primary' ? colors.onPrimary : colors.primaryText;

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && shadow.card,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
    minHeight: 52,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  label: { ...typography.bodyStrong },
});
