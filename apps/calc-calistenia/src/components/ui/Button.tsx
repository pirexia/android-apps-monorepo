import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { useTheme } from '../../theme/colors';
import { radius } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  accessibilityRole?: 'button' | 'link';
  style?: StyleProp<ViewStyle>;
}

const MODE: Record<ButtonVariant, 'contained' | 'contained-tonal' | 'outlined'> = {
  primary: 'contained',
  secondary: 'contained-tonal',
  ghost: 'outlined',
};

/**
 * Botón "soft" montado sobre `react-native-paper`:
 * - primary: relleno pastel `primary` + tinta `onPrimary` (contained).
 * - secondary: relleno `primarySoft` + tinta `primaryText` (contained-tonal).
 * - ghost: fondo transparente + borde `border` + tinta `primaryText` (outlined).
 *
 * Los colores se pasan explícitos desde [`useTheme()`](../../theme/colors.ts:31) para que
 * `colors.ts` siga siendo la única fuente de verdad (no se depende del tema por contexto).
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  accessibilityRole = 'button',
  style,
}: ButtonProps) {
  const colors = useTheme();

  const buttonColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.primarySoft
        : undefined;

  const textColor = variant === 'primary' ? colors.onPrimary : colors.primaryText;

  return (
    <PaperButton
      mode={MODE[variant]}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      buttonColor={buttonColor}
      textColor={textColor}
      style={[styles.button, variant === 'ghost' && styles.ghost, style]}
    >
      {label}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: radius.lg, minHeight: 52 },
  ghost: { backgroundColor: 'transparent' },
});
