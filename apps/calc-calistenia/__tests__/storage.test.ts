import AsyncStorage from '@react-native-async-storage/async-storage';

import { load, remove, save } from '../src/lib/storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('storage · robustez offline (INV-003, INV-007)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('load devuelve null si no hay valor', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    await expect(load('unit')).resolves.toBeNull();
  });

  test('load parsea un JSON válido', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('"lb"');
    await expect(load('unit')).resolves.toBe('lb');
  });

  test('load devuelve null si el JSON es inválido', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('{no-json');
    await expect(load('unit')).resolves.toBeNull();
  });

  test('load devuelve null si AsyncStorage lanza (error de storage)', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('storage error'));
    await expect(load('unit')).resolves.toBeNull();
  });

  test('save devuelve true al guardar correctamente', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    await expect(save('unit', 'kg')).resolves.toBe(true);
  });

  test('save devuelve false si AsyncStorage lanza (storage roto / offline)', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('storage error'));
    await expect(save('unit', 'kg')).resolves.toBe(false);
  });

  test('remove devuelve false si AsyncStorage lanza', async () => {
    (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error('storage error'));
    await expect(remove('unit')).resolves.toBe(false);
  });
});
