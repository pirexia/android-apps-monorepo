import SettingsScreen from '../app/settings';
import { renderWithPaper } from '../test-utils/render';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

test('la pantalla de ajustes muestra la política de privacidad (INV-004)', () => {
  const { getByText } = renderWithPaper(<SettingsScreen />);
  expect(getByText('Ajustes')).toBeTruthy();
  expect(getByText('Política de privacidad')).toBeTruthy();
});
