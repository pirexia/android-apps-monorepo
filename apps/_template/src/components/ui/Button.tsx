import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  accessibilityRole?: 'button' | 'link';
  style?: StyleProp<ViewStyle>;
}

/**
 * Botón reutilizable con variantes. Uso en ajustes, CTAs y navegación.
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

  const borderColor = variant === 'ghost' ? colors.border : 'transparent';

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: variant === 'primary' ? colors.onPrimary : colors.primary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  label: { fontSize: 16, fontWeight: '700' },
});
