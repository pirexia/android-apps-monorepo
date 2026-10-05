import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AdBanner } from '../src/components/AdBanner';
import { showInterstitial } from '../src/components/AdInterstitial';
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
import { useTheme } from '../src/theme/colors';

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

export default function HomeScreen() {
  const colors = useTheme();
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
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.text }]}>Calculadora de Calistenia</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Estima tu 1RM, el volumen y el lastre equivalente. 100% offline.
      </Text>

      <View style={styles.unitRow}>
        {(['kg', 'lb'] as const).map((u) => (
          <Pressable
            key={u}
            accessibilityRole="button"
            accessibilityState={{ selected: unit === u }}
            onPress={() => changeUnit(u)}
            style={[
              styles.unitButton,
              { borderColor: colors.border },
              unit === u && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          >
            <Text style={[styles.unitText, { color: unit === u ? '#FFFFFF' : colors.text }]}>
              {u}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.label, { color: colors.text }]}>Peso corporal ({unitLabel})</Text>
        <TextInput
          value={bodyWeight}
          onChangeText={setBodyWeight}
          keyboardType="decimal-pad"
          placeholder="80"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Peso corporal"
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />

        <Text style={[styles.label, { color: colors.text }]}>Lastre añadido ({unitLabel})</Text>
        <TextInput
          value={addedWeight}
          onChangeText={setAddedWeight}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Lastre añadido"
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />

        <Text style={[styles.label, { color: colors.text }]}>Repeticiones realizadas</Text>
        <TextInput
          value={reps}
          onChangeText={setReps}
          keyboardType="number-pad"
          placeholder="10"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Repeticiones realizadas"
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />

        <Text style={[styles.label, { color: colors.text }]}>Repeticiones objetivo</Text>
        <TextInput
          value={targetReps}
          onChangeText={setTargetReps}
          keyboardType="number-pad"
          placeholder="5"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Repeticiones objetivo"
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />

        <Pressable
          accessibilityRole="button"
          onPress={handleCalculate}
          style={({ pressed }) => [
            styles.calculateButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.calculateText}>Calcular</Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      {result ? (
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Resultados</Text>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
              1RM estimado
            </Text>
            <Text style={[styles.resultValue, { color: colors.text }]}>
              {result.oneRepMax.toFixed(1)} {unitLabel}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
              Volumen de la serie
            </Text>
            <Text style={[styles.resultValue, { color: colors.text }]}>
              {result.volume.toFixed(1)} {unitLabel}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
              Carga equivalente ({result.targetReps} reps)
            </Text>
            <Text style={[styles.resultValue, { color: colors.text }]}>
              {result.equivalentLoad.toFixed(1)} {unitLabel}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
              Lastre equivalente
            </Text>
            <Text style={[styles.resultValue, { color: colors.text }]}>
              {result.requiresNoAddedWeight
                ? 'Sin lastre adicional'
                : `${result.equivalentAddedWeight.toFixed(1)} ${unitLabel}`}
            </Text>
          </View>
        </View>
      ) : null}

      <Link href="/settings" style={[styles.link, { color: colors.primary }]}>
        Abrir ajustes
      </Link>

      <AdBanner />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, gap: 16, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, textAlign: 'left' },
  unitRow: { flexDirection: 'row', gap: 12 },
  unitButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  unitText: { fontSize: 16, fontWeight: '600', textTransform: 'uppercase' },
  card: { borderRadius: 12, padding: 16, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  calculateButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  error: { color: '#FF453A', fontSize: 14, marginTop: 4 },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  resultLabel: { fontSize: 14 },
  resultValue: { fontSize: 16, fontWeight: '700' },
  link: { fontSize: 16, fontWeight: '600' },
});
