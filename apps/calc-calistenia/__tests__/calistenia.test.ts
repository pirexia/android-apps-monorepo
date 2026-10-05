import {
  calculateVolume,
  equivalentAddedWeight,
  equivalentLoad,
  estimateOneRepMax,
  requiresNoAddedWeight,
  round1,
  validateInput,
  validateTargetReps,
} from '../src/lib/calistenia';

describe('calc-calistenia · lógica pura', () => {
  // --- Camino feliz ---

  test('CA-001: 1RM con Epley y volumen', () => {
    const input = { bodyWeight: 80, addedWeight: 0, reps: 10 };
    expect(estimateOneRepMax(input)).toBe(106.7);
    expect(calculateVolume(input)).toBe(800);
  });

  test('CA-002: 1 repetición → 1RM = carga (sin Epley)', () => {
    expect(estimateOneRepMax({ bodyWeight: 80, addedWeight: 0, reps: 1 })).toBe(80);
  });

  test('CA-003: lastre equivalente para otro número de reps', () => {
    const input = { bodyWeight: 80, addedWeight: 0, reps: 10 };
    expect(equivalentLoad(input, 5)).toBe(91.4);
    expect(equivalentAddedWeight(input, 5)).toBe(11.4);
  });

  test('CA-005: fórmulas unit-agnósticas (libras)', () => {
    const input = { bodyWeight: 176.4, addedWeight: 0, reps: 10 };
    expect(estimateOneRepMax(input)).toBe(235.2);
    expect(calculateVolume(input)).toBe(1764);
  });

  // --- Casos límite ---

  test('CA-004: lastre equivalente acotado a 0 (carga equivalente < peso corporal)', () => {
    const input = { bodyWeight: 80, addedWeight: 0, reps: 1 };
    expect(equivalentAddedWeight(input, 10)).toBe(0);
    expect(requiresNoAddedWeight(input, 10)).toBe(true);
  });

  test('Límite: repeticiones objetivo = 1 → carga equivalente = 1RM', () => {
    const input = { bodyWeight: 80, addedWeight: 10, reps: 5 };
    expect(equivalentLoad(input, 1)).toBe(estimateOneRepMax(input));
  });

  test('Límite: cálculo con lastre añadido', () => {
    const input = { bodyWeight: 80, addedWeight: 10, reps: 5 };
    expect(estimateOneRepMax(input)).toBe(105); // 90 × (1 + 5/30)
    expect(equivalentLoad(input, 3)).toBe(95.5); // 105 / (1 + 3/30) = 95.45…
    expect(equivalentAddedWeight(input, 3)).toBe(15.5);
  });

  test('Límite: decimales en peso y lastre (redondeo a 1 decimal)', () => {
    expect(round1(72.5 + 7.25)).toBe(79.8); // carga = 79.75 → 79.8
  });

  test('Límite: peso corporal mínimo positivo', () => {
    expect(estimateOneRepMax({ bodyWeight: 0.1, addedWeight: 0, reps: 1 })).toBe(0.1);
  });

  test('Límite: repeticiones altas sin límite superior (Q-4)', () => {
    const input = { bodyWeight: 80, addedWeight: 0, reps: 100 };
    expect(estimateOneRepMax(input)).toBe(346.7); // 80 × (1 + 100/30)
  });

  test('round1 redondea hacia arriba en el .5', () => {
    expect(round1(0.25)).toBe(0.3);
    expect(round1(0.05)).toBe(0.1);
  });

  // --- Offline ---

  test('INV-003: el cálculo es síncrono y no depende de red ni de storage', () => {
    const input = { bodyWeight: 80, addedWeight: 0, reps: 10 };
    expect(estimateOneRepMax(input)).toBe(106.7);
    expect(calculateVolume(input)).toBe(800);
  });

  // --- Validación ---

  test('CA-008: validación de entradas', () => {
    expect(validateInput(0, 0, 10)).not.toBeNull();
    expect(validateInput(80, -1, 10)).not.toBeNull();
    expect(validateInput(80, 0, 0)).not.toBeNull();
    expect(validateInput(80, 0, 1.5)).not.toBeNull();
    expect(validateInput(Number.NaN, 0, 10)).not.toBeNull();
    expect(validateInput(80, 0, 10)).toBeNull();
    expect(validateTargetReps(0)).not.toBeNull();
    expect(validateTargetReps(1.5)).not.toBeNull();
    expect(validateTargetReps(5)).toBeNull();
  });
});
