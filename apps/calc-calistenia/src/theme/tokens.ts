import type { TextStyle, ViewStyle } from 'react-native';

/**
 * Tokens no-cromáticos del sistema de diseño (docs/design-system/tokens.md).
 * Fuente única de espaciado, radios, sombras y tipografía. Sin valores mágicos en los componentes.
 * Mantenido en sincronía con la plantilla [`apps/_template/src/theme/tokens.ts`](../../../_template/src/theme/tokens.ts:1).
 */

/** Espaciado base 4 (tokens.md §4). */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Radios (tokens.md §5). */
export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
  pill: 999,
} as const;

/** Sombras suaves (tokens.md §6). La definición la da el borde, no la sombra. */
export const shadow: Record<'card' | 'elevated', ViewStyle> = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
};

/** Tipografía (tokens.md §3). */
export const typography: Record<
  | 'display'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodyStrong'
  | 'label'
  | 'caption'
  | 'input',
  TextStyle
> = {
  display: { fontSize: 32, fontWeight: '800', lineHeight: 38 },
  title: { fontSize: 26, fontWeight: '800', lineHeight: 32 },
  heading: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  bodyStrong: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  label: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  input: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
};
