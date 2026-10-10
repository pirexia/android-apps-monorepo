import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { palette, type ThemeColors } from './colors';

/**
 * Puente de tema hacia `react-native-paper`.
 *
 * Fuente única de color: [`colors.ts`](colors.ts:1) (tokens de
 * `docs/design-system/tokens.md`). Aquí NO se introduce ningún hex nuevo:
 * solo se traducen los roles propios del sistema "soft" a los roles MD3.
 *
 * `react-native-paper` es únicamente la capa de render; la paleta sigue
 * viviendo en `colors.ts` y en `docs/design-system/tokens.md`.
 */
export function buildPaperTheme(colors: ThemeColors, dark: boolean): MD3Theme {
  const base = dark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      // Acento de la app (§1 de tokens.md)
      primary: colors.primary,
      onPrimary: colors.onPrimary,
      primaryContainer: colors.primarySoft,
      onPrimaryContainer: colors.primaryText,
      secondary: colors.primaryText,
      onSecondary: colors.onPrimary,
      secondaryContainer: colors.primarySoft,
      onSecondaryContainer: colors.primaryText,
      tertiary: colors.primaryText,
      onTertiary: colors.onPrimary,
      // Neutros (§2 de tokens.md)
      background: colors.background,
      onBackground: colors.text,
      surface: colors.surface,
      onSurface: colors.text,
      surfaceVariant: colors.surfaceAlt,
      onSurfaceVariant: colors.textSecondary,
      outline: colors.border,
      outlineVariant: colors.border,
      // Semánticos (§2 de tokens.md)
      error: colors.danger,
    },
  };
}

/**
 * Tema Paper derivado del esquema activo del sistema (Dark/Light automático).
 */
export function usePaperTheme(): MD3Theme {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  return buildPaperTheme(dark ? palette.dark : palette.light, dark);
}
