import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '../src/components/AdBanner';
import { showInterstitial } from '../src/components/AdInterstitial';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { Field } from '../src/components/ui/Field';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { SegmentedControl } from '../src/components/ui/SegmentedControl';
import {
  calculateVolume,
  equivalentAddedWeight,
  equivalentLoad,
  estimateOneRepMax,
  requiresNoAddedWeight,
  validateInput,
  validateTargetReps,
  type CalisthenicsInput,
  type Unit,
} from '../src/lib/calistenia';
import { load, save } from '../src/lib/storage';
import { useTheme, type ThemeColors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/tokens';

interface Result {
  oneRepMax: number;
  volume: number;
  targetReps: number;
  equivalentLoad: number;
  equivalentAddedWeight: number;
  requiresNoAddedWeight: boolean;
}

interface LastInput {
  bodyWeight: string;
  addedWeight: string;
  reps: string;
  targetReps: string;
}

const LAST_INPUT_KEY = 'lastInput';

interface Computation {
  error: string | null;
  result: Result | null;
}

function parseDecimal(raw: string): number {
  return Number.parseFloat(raw.replace(',', '.'));
}

function computeResult(bw: number, aw: number, r: number, tr: number): Computation {
  const inputError = validateInput(bw, aw, r) ?? validateTargetReps(tr);
  if (inputError) {
    return { error: inputError, result: null };
  }

  const input: CalisthenicsInput = { bodyWeight: bw, addedWeight: aw, reps: r };
  return {
    error: null,
    result: {
      oneRepMax: estimateOneRepMax(input),
      volume: calculateVolume(input),
      targetReps: tr,
      equivalentLoad: equivalentLoad(input, tr),
      equivalentAddedWeight: equivalentAddedWeight(input, tr),
      requiresNoAddedWeight: requiresNoAddedWeight(input, tr),
    },
  };
}

function ResultRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: ThemeColors;
}) {
  return (
    <View style={styles.resultRow}>
      <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.resultValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [unit, setUnit] = useState<Unit>('kg');
  const [bodyWeight, setBodyWeight] = useState('');
  const [addedWeight, setAddedWeight] = useState('');
  const [reps, setReps] = useState('');
  const [targetReps, setTargetReps] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const calcCount = useRef(0);
  const lastShownAt = useRef(0);

  useEffect(() => {
    let active = true;
    void (async () => {
      const [storedUnit, storedLast] = await Promise.all([
        load<Unit>('unit'),
        load<LastInput>(LAST_INPUT_KEY),
      ]);
      if (!active) {
        return;
      }

      if (storedUnit === 'kg' || storedUnit === 'lb') {
        setUnit(storedUnit);
      }

      if (storedLast && typeof storedLast.bodyWeight === 'string') {
        setBodyWeight(storedLast.bodyWeight);
        setAddedWeight(storedLast.addedWeight);
        setReps(storedLast.reps);
        setTargetReps(storedLast.targetReps);

        const bw = parseDecimal(storedLast.bodyWeight);
        const aw = parseDecimal(storedLast.addedWeight);
        const r = parseDecimal(storedLast.reps);
        const tr = parseDecimal(storedLast.targetReps);
        const { error, result } = computeResult(bw, aw, r, tr);
        setError(error);
        setResult(result);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  function changeUnit(next: Unit) {
    setUnit(next);
    void save('unit', next);
  }

  function maybeShowInterstitial() {
    calcCount.current += 1;
    const now = Date.now();
    if (calcCount.current % 3 === 0 && now - lastShownAt.current >= 60_000) {
      lastShownAt.current = now;
      showInterstitial();
    }
  }

  function handleCalculate() {
    const bw = parseDecimal(bodyWeight);
    const aw = parseDecimal(addedWeight);
    const r = parseDecimal(reps);
    const tr = parseDecimal(targetReps);

    const { error, result } = computeResult(bw, aw, r, tr);
    setError(error);
    setResult(result);

    if (!error && result) {
      void save<LastInput>(LAST_INPUT_KEY, {
        bodyWeight,
        addedWeight,
        reps,
        targetReps,
      });
      maybeShowInterstitial();
    }
  }

  const unitLabel = unit === 'kg' ? 'kg' : 'lb';

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Calculadora de Calistenia"
          caption="Estima tu 1RM, el volumen y el lastre equivalente. 100% offline."
        />

        <Card>
          <SegmentedControl<Unit>
            options={['kg', 'lb']}
            value={unit}
            onChange={changeUnit}
          />

          <Field
            label={`Peso corporal (${unitLabel})`}
            value={bodyWeight}
            onChangeText={setBodyWeight}
            keyboardType="decimal-pad"
            placeholder="Ej. 80"
            accessibilityLabel="Peso corporal"
          />

          <Field
            label={`Lastre añadido (${unitLabel})`}
            value={addedWeight}
            onChangeText={setAddedWeight}
            keyboardType="decimal-pad"
            placeholder="Ej. 0"
            accessibilityLabel="Lastre añadido"
          />

          <Field
            label="Repeticiones realizadas"
            value={reps}
            onChangeText={setReps}
            keyboardType="number-pad"
            placeholder="Ej. 10"
            accessibilityLabel="Repeticiones realizadas"
          />

          <Field
            label="Repeticiones objetivo"
            value={targetReps}
            onChangeText={setTargetReps}
            keyboardType="number-pad"
            placeholder="Ej. 5"
            accessibilityLabel="Repeticiones objetivo"
          />

          {error ? (
            <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
          ) : null}

          <Button label="Calcular" onPress={handleCalculate} />
        </Card>

        {result ? (
          <Card>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Resultados</Text>

            <View style={[styles.hero, { backgroundColor: colors.primarySoft }]}>
              <Text style={[styles.heroLabel, { color: colors.textSecondary }]}>
                1RM estimado
              </Text>
              <Text style={[styles.heroValue, { color: colors.primaryText }]}>
                {result.oneRepMax.toFixed(1)} {unitLabel}
              </Text>
            </View>

            <ResultRow
              label="Volumen de la serie"
              value={`${result.volume.toFixed(1)} ${unitLabel}`}
              colors={colors}
            />
            <ResultRow
              label={`Carga equivalente (${result.targetReps} reps)`}
              value={`${result.equivalentLoad.toFixed(1)} ${unitLabel}`}
              colors={colors}
            />
            <ResultRow
              label="Lastre equivalente"
              value={
                result.requiresNoAddedWeight
                  ? 'Sin lastre adicional'
                  : `${result.equivalentAddedWeight.toFixed(1)} ${unitLabel}`
              }
              colors={colors}
            />
          </Card>
        ) : null}

        <Link href="/settings" style={[styles.link, { color: colors.primaryText }]}>
          Abrir ajustes
        </Link>
      </ScrollView>

      <View
        style={[
          styles.adContainer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            minHeight: Math.round(windowHeight * 0.2),
            paddingBottom: Math.max(insets.bottom, spacing.md),
          },
        ]}
      >
        <AdBanner />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: spacing.xl, gap: spacing.lg, paddingBottom: spacing.xxl },
  cardTitle: { ...typography.heading },
  error: { ...typography.label },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    alignItems: 'center',
  },
  heroLabel: { ...typography.label, textTransform: 'uppercase' },
  heroValue: { ...typography.display },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  resultLabel: { ...typography.label },
  resultValue: { ...typography.bodyStrong },
  link: { ...typography.bodyStrong, textAlign: 'center', paddingVertical: spacing.xs },
  adContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
