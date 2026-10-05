import { render } from '@testing-library/react-native';

import PrivacyScreen from '../app/privacy';

test('la política de privacidad in-app muestra el texto legal (INV-004)', () => {
  const { getByText } = render(<PrivacyScreen />);
  expect(getByText('Política de privacidad')).toBeTruthy();
  expect(getByText(/no recoge ni almacena datos personales/)).toBeTruthy();
});
