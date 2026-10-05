import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';

import HomeScreen from '../app/index';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Link: ({ children }: { children: React.ReactNode }) =>
      React.createElement(Text, null, children),
  };
});

jest.mock('react-native-google-mobile-ads', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    BannerAd: () => React.createElement(View, null),
    BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'banner' },
    InterstitialAd: {
      createForAdRequest: jest.fn(() => ({
        loaded: false,
        load: jest.fn(),
        show: jest.fn(),
        addAdEventListener: jest.fn(),
      })),
    },
    AdEventType: { CLOSED: 'closed', LOADED: 'loaded', ERROR: 'error' },
  };
});

describe('HomeScreen (HU-001 … HU-004)', () => {
  test('HU-001/HU-002 · CA-001, CA-003: camino feliz desde la UI', () => {
    const { getByLabelText, getByText } = render(<HomeScreen />);

    fireEvent.changeText(getByLabelText('Peso corporal'), '80');
    fireEvent.changeText(getByLabelText('Lastre añadido'), '0');
    fireEvent.changeText(getByLabelText('Repeticiones realizadas'), '10');
    fireEvent.changeText(getByLabelText('Repeticiones objetivo'), '5');
    fireEvent.press(getByText('Calcular'));

    expect(getByText('106.7 kg')).toBeTruthy();
    expect(getByText('800.0 kg')).toBeTruthy();
    expect(getByText('91.4 kg')).toBeTruthy();
    expect(getByText('11.4 kg')).toBeTruthy();
  });

  test('CA-004: muestra "Sin lastre adicional" cuando no hace falta lastre', () => {
    const { getByLabelText, getByText } = render(<HomeScreen />);

    fireEvent.changeText(getByLabelText('Peso corporal'), '80');
    fireEvent.changeText(getByLabelText('Lastre añadido'), '0');
    fireEvent.changeText(getByLabelText('Repeticiones realizadas'), '1');
    fireEvent.changeText(getByLabelText('Repeticiones objetivo'), '10');
    fireEvent.press(getByText('Calcular'));

    expect(getByText('Sin lastre adicional')).toBeTruthy();
  });

  test('CA-008: mensaje de validación con entrada inválida', () => {
    const { getByLabelText, getByText } = render(<HomeScreen />);

    fireEvent.changeText(getByLabelText('Peso corporal'), '0');
    fireEvent.changeText(getByLabelText('Lastre añadido'), '0');
    fireEvent.changeText(getByLabelText('Repeticiones realizadas'), '10');
    fireEvent.changeText(getByLabelText('Repeticiones objetivo'), '5');
    fireEvent.press(getByText('Calcular'));

    expect(getByText('El peso corporal debe ser mayor que 0.')).toBeTruthy();
  });

  test('HU-003: cambia a libras y persiste la preferencia', () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('lb'));

    expect(getByText('Peso corporal (lb)')).toBeTruthy();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('unit', '"lb"');
  });

  test('CA-010: guarda el último cálculo al pulsar Calcular', () => {
    const { getByLabelText, getByText } = render(<HomeScreen />);

    fireEvent.changeText(getByLabelText('Peso corporal'), '80');
    fireEvent.changeText(getByLabelText('Lastre añadido'), '0');
    fireEvent.changeText(getByLabelText('Repeticiones realizadas'), '10');
    fireEvent.changeText(getByLabelText('Repeticiones objetivo'), '5');
    fireEvent.press(getByText('Calcular'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'lastInput',
      '{"bodyWeight":"80","addedWeight":"0","reps":"10","targetReps":"5"}',
    );
  });

  test('CA-010: restaura el último cálculo al abrir la app', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === 'lastInput') {
        return Promise.resolve(
          '{"bodyWeight":"80","addedWeight":"0","reps":"10","targetReps":"5"}',
        );
      }
      return Promise.resolve(null);
    });

    const { findByText, getByLabelText } = render(<HomeScreen />);

    expect(await findByText('106.7 kg')).toBeTruthy();
    expect(getByLabelText('Peso corporal').props.value).toBe('80');
    expect(getByLabelText('Lastre añadido').props.value).toBe('0');
    expect(getByLabelText('Repeticiones realizadas').props.value).toBe('10');
    expect(getByLabelText('Repeticiones objetivo').props.value).toBe('5');
  });
});
