import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { radius } from '../../theme/tokens';

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Selector segmentado tipo píldora montado sobre `SegmentedButtons` de
 * react-native-paper. El mapeo de colores lo resuelve el tema Paper derivado
 * de `colors.ts` (`secondaryContainer` → `primarySoft`, etc.).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={(next) => onChange(next as T)}
      buttons={options.map((option) => ({ value: option, label: option }))}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: radius.lg },
});
