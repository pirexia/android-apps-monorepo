import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/colors';
import { radius, shadow, spacing, typography } from '../../theme/tokens';

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Selector segmentado tipo píldora (kg/lb, etc.). El segmento activo usa `surface` +
 * tinta `primaryText`; el contenedor lleva borde fino (línea clara).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
      ]}
    >
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              selected && shadow.card,
              selected && { backgroundColor: colors.surface },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: selected ? colors.primaryText : colors.textSecondary },
              ]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { ...typography.label, textTransform: 'uppercase' },
});
