import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
}

export const palette: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#111111',
    textSecondary: '#555555',
    primary: '#0A84FF',
    border: '#D1D1D6',
  },
  dark: {
    background: '#111111',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#A1A1A6',
    primary: '#0A84FF',
    border: '#2C2C2E',
  },
};

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? palette.dark : palette.light;
}
