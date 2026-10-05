import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';

import { useTheme } from '../../theme/colors';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  accessibilityLabel: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

/**
 * Campo de texto con etiqueta y estilo "filled" (sin borde, sobre superficie tenue).
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
          { color: colors.text, backgroundColor: colors.surfaceAlt },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 17,
    fontWeight: '600',
  },
});
