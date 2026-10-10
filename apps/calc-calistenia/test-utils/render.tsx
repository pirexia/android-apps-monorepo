import type { ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';

import { palette } from '../src/theme/colors';
import { buildPaperTheme } from '../src/theme/paperTheme';

/**
 * Renderiza la pantalla envuelta en el `PaperProvider` con el tema "soft"
 * (light) derivado de los tokens. Mantiene los colores de `colors.ts` como
 * fuente única en los tests.
 */
export function renderWithPaper(ui: ReactElement) {
  return render(
    <PaperProvider theme={buildPaperTheme(palette.light, false)}>{ui}</PaperProvider>,
  );
}
