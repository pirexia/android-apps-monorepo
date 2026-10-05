import { render } from '@testing-library/react-native';

import SettingsScreen from '../app/settings';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

test('la pantalla de ajustes muestra la política de privacidad (INV-004)', () => {
  const { getByText } = render(<SettingsScreen />);
  expect(getByText('Ajustes')).toBeTruthy();
  expect(getByText('Política de privacidad')).toBeTruthy();
});
