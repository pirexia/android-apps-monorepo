import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  placeholder: string;
  border: string;
  danger: string;
  success: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  primarySoft: string;
  primaryText: string;
  primaryBorder: string;
}

type Scheme = 'light' | 'dark';

/**
 * Neutros compartidos por TODAS las apps (tokens.md §2).
 * Aspecto "soft": lienzo claro, tarjetas blancas y bordes finos ("líneas claras").
 */
const neutrals: Record<
  Scheme,
  Pick<
    ThemeColors,
    | 'background'
    | 'surface'
    | 'surfaceAlt'
    | 'text'
    | 'textSecondary'
    | 'placeholder'
    | 'border'
    | 'danger'
    | 'success'
  >
> = {
  light: {
    background: '#F6F8F9',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF3F2',
    text: '#14201D',
    textSecondary: '#5E6E69',
    placeholder: '#9BA8A4',
    border: '#E2EAE8',
    danger: '#C0392B',
    success: '#0B6B4F',
  },
  dark: {
    background: '#0F1512',
    surface: '#19211E',
    surfaceAlt: '#222C28',
    text: '#F1F5F3',
    textSecondary: '#A2B0AB',
    placeholder: '#73817C',
    border: '#2B3531',
    danger: '#FF8A80',
    success: '#4ADE97',
  },
};

/**
 * Acento por app (tokens.md §9). Modelo "relleno pastel + tinta legible":
 * `primary` es el relleno pastel y `onPrimary`/`primaryText` la tinta que cumple AA.
 * Plantilla por defecto: `mint` (calc-calistenia). Para otra app, sustituye este bloque
 * por el acento elegido del catálogo.
 */
const accent: Record<
  Scheme,
  Pick<
    ThemeColors,
    | 'primary'
    | 'primaryPressed'
    | 'onPrimary'
    | 'primarySoft'
    | 'primaryText'
    | 'primaryBorder'
  >
> = {
  light: {
    primary: '#CDEEE7',
    primaryPressed: '#B7E4DA',
    onPrimary: '#17594F',
    primarySoft: '#EAFBF7',
    primaryText: '#17594F',
    primaryBorder: '#B7E4DA',
  },
  dark: {
    primary: '#C7ECE3',
    primaryPressed: '#AFE1D5',
    onPrimary: '#103B33',
    primarySoft: '#16332D',
    primaryText: '#6ED9C3',
    primaryBorder: '#2C5A4F',
  },
};

export const palette: Record<Scheme, ThemeColors> = {
  light: { ...neutrals.light, ...accent.light },
  dark: { ...neutrals.dark, ...accent.dark },
};

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? palette.dark : palette.light;
}
