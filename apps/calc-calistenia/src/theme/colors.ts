import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  placeholder: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  primarySoft: string;
  border: string;
  danger: string;
  success: string;
}

/**
 * Paleta de marca "fitness" (bicolor: tinta navy + acento naranja).
 * Mantenida en sincronía con la plantilla [`apps/_template/src/theme/colors.ts`](../../../_template/src/theme/colors.ts:1).
 */
export const palette: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#F4F5FB',
    surface: '#FFFFFF',
    surfaceAlt: '#E9EBF4',
    text: '#151829',
    textSecondary: '#5D6579',
    placeholder: '#A0A7BA',
    primary: '#FF6A3D',
    primaryPressed: '#E8542B',
    onPrimary: '#FFFFFF',
    primarySoft: '#FFE9DF',
    border: '#E4E7F0',
    danger: '#D92D20',
    success: '#12805C',
  },
  dark: {
    background: '#0F1220',
    surface: '#191D30',
    surfaceAlt: '#252A42',
    text: '#F1F3FA',
    textSecondary: '#9AA3BC',
    placeholder: '#6B7590',
    primary: '#FF7A4D',
    primaryPressed: '#E8643A',
    onPrimary: '#FFFFFF',
    primarySoft: '#3A2822',
    border: '#2B3150',
    danger: '#FF6B60',
    success: '#34D399',
  },
};

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? palette.dark : palette.light;
}
