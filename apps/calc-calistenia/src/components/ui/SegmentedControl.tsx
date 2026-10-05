import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/colors';

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Selector segmentado tipo píldora (kg/lb, etc.).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceAlt }]}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            style={[styles.segment, selected && { backgroundColor: colors.surface }]}
          >
            <Text
              style={[
                styles.label,
                { color: selected ? colors.primary : colors.textSecondary },
                selected && styles.labelSelected,
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
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 15, fontWeight: '600', textTransform: 'uppercase' },
  labelSelected: { fontWeight: '700' },
});
