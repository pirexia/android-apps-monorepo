/**
 * Lógica pura de la calculadora de calistenia (sin React, sin red, sin AsyncStorage).
 * Fórmulas de [`REQUIREMENTS.md`](../../docs/REQUIREMENTS.md:1):
 *  - Carga = peso corporal + lastre
 *  - 1RM = Carga × (1 + reps / 30) si reps ≥ 2; si reps = 1, 1RM = Carga (Epley)
 *  - Volumen = Carga × reps
 *  - Carga equivalente = 1RM / (1 + reps objetivo / 30)
 *  - Lastre equivalente = máx(0, Carga equivalente − peso corporal)
 */

export type Unit = 'kg' | 'lb';

export interface CalisthenicsInput {
  bodyWeight: number;
  addedWeight: number;
  reps: number;
}

/** Redondea a 1 decimal (mitad hacia arriba). */
export function round1(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function unroundedOneRepMax(input: CalisthenicsInput): number {
  const load = input.bodyWeight + input.addedWeight;
  if (input.reps <= 1) return load;
  return load * (1 + input.reps / 30);
}

export function estimateOneRepMax(input: CalisthenicsInput): number {
  return round1(unroundedOneRepMax(input));
}

export function calculateVolume(input: CalisthenicsInput): number {
  return round1((input.bodyWeight + input.addedWeight) * input.reps);
}

export function equivalentLoad(input: CalisthenicsInput, targetReps: number): number {
  const oneRm = unroundedOneRepMax(input);
  const load = targetReps <= 1 ? oneRm : oneRm / (1 + targetReps / 30);
  return round1(load);
}

export function equivalentAddedWeight(input: CalisthenicsInput, targetReps: number): number {
  const oneRm = unroundedOneRepMax(input);
  const load = targetReps <= 1 ? oneRm : oneRm / (1 + targetReps / 30);
  const added = load - input.bodyWeight;
  return added <= 0 ? 0 : round1(added);
}

export function requiresNoAddedWeight(input: CalisthenicsInput, targetReps: number): boolean {
  const oneRm = unroundedOneRepMax(input);
  const load = targetReps <= 1 ? oneRm : oneRm / (1 + targetReps / 30);
  return load - input.bodyWeight <= 0;
}

export function validateInput(
  bodyWeight: number,
  addedWeight: number,
  reps: number,
): string | null {
  if (!Number.isFinite(bodyWeight) || bodyWeight <= 0) {
    return 'El peso corporal debe ser mayor que 0.';
  }
  if (!Number.isFinite(addedWeight) || addedWeight < 0) {
    return 'El lastre no puede ser negativo.';
  }
  if (!Number.isInteger(reps) || reps < 1) {
    return 'Las repeticiones deben ser un entero mayor o igual a 1.';
  }
  return null;
}

export function validateTargetReps(targetReps: number): string | null {
  if (!Number.isInteger(targetReps) || targetReps < 1) {
    return 'Las repeticiones objetivo deben ser un entero mayor o igual a 1.';
  }
  return null;
}
