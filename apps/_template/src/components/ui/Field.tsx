import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';

import { useTheme } from '../../theme/colors';
import { radius, spacing, typography } from '../../theme/tokens';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  accessibilityLabel: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

/**
 * Campo de texto "soft": fondo `surfaceAlt` con borde fino `border` (línea clara).
 */
export function Field({
  label,
  value,
  onChangeText,
  accessibilityLabel,
  placeholder,
  keyboardType,
}: FieldProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={accessibilityLabel}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: { ...typography.label },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.input,
  },
});
