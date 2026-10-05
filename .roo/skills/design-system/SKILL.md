---
name: design-system
description: >
  Sistema de diseño del monorrepo: tokens de color, tipografía, espaciado, radios y sombras, y
  reglas de UI para React Native/Expo con soporte Dark/Light. Úsala antes de maquetar o rediseñar
  cualquier pantalla o componente, y siempre desde el modo `ui-designer`.
---

# Design System (React Native / Expo)

## Regla de oro

**Antes de maquetar, LEE [`docs/design-system/tokens.md`](../../../docs/design-system/tokens.md:1).**
No inventes colores, tamaños, radios ni espaciados: usa los tokens. Si falta un token, propón
añadirlo al fichero, no improvises un valor suelto.

## Fuente de verdad

| Qué | Dónde |
| --- | --- |
| Tokens (paleta, tipografía, espaciado, radios, sombras) | [`docs/design-system/tokens.md`](../../../docs/design-system/tokens.md:1) |
| **Patrón de pantalla común a todas las apps** | [`docs/design-system/app-pattern.md`](../../../docs/design-system/app-pattern.md:1) |
| Implementación de la paleta | [`apps/_template/src/theme/colors.ts`](../../../apps/_template/src/theme/colors.ts:1) |
| Componentes base | `apps/_template/src/components/ui/` (`Button`, `Card`, `Field`, `SegmentedControl`) |
| Ejemplo de pantalla | [`docs/design-system/tip-split-home.md`](../../../docs/design-system/tip-split-home.md:1) |

> **Ámbito: todas las apps.** Estas reglas no son de una app concreta; aplican a cualquier
> `apps/<app-slug>`. La base compartida vive en [`apps/_template`](../../../apps/_template/README.md:1).

## Principios

1. **Minimalista**: una idea por bloque; nada de adornos que no aporten.
2. **Alto contraste y jerarquía clara**: título > dato principal > secundario.
3. **Consistencia**: mismos tokens y mismos componentes en todas las apps.
4. **Dark/Light a la par**: cada pantalla se revisa en ambos temas (`useColorScheme` /
   `userInterfaceStyle: automatic`). Nunca colores fijos que rompan un tema.
5. **Sombras suaves**: elevación discreta; el borde aporta la definición, no la sombra dura.
6. **Accesibilidad**: contraste AA, áreas táctiles ≥ 44, `accessibilityRole` y
   `accessibilityLabel` correctos.
7. **Sin dependencias de UI nuevas**: `StyleSheet.create` nativo. Nada de librerías de
   componentes/ICONOS que no estén ya justificadas.

## Reglas de implementación

- Estilos exclusivamente con `StyleSheet.create`; los valores salen de los tokens.
- Lee colores con `useTheme()`; no codifiques hex en los componentes.
- Reutiliza `src/components/ui/`. Si necesitas un componente nuevo, créalo reutilizable y
  documenta su receta en `tokens.md`.
- Mantén INV-002 (IDs de prueba), INV-004 (ajustes con política de privacidad) e INV-006
  (sin permisos nuevos).

## Recetas rápidas

**Card** — `surface` + borde `border` 1 px + radio `lg` (20) + sombra `card` suave.

**Botón primario** — fondo `primary`, texto `onPrimary`, radio `md` (14), alto ≥ 48, feedback al
pulsar (opacidad 0.85).

**Input (Field)** — fondo `surfaceAlt` sin borde, texto `text`, placeholder `placeholder`, radio
`md` (14). Los ejemplos se marcan con `Ej.`.

**Dato destacado (hero)** — fondo `primarySoft`, valor en `primary` a tamaño `display`, etiqueta
en `textSecondary` a tamaño `label`.

## Checklist antes de entregar

- [ ] He leído `tokens.md` y no he introducido valores mágicos.
- [ ] La pantalla se ve correcta en Modo Claro y en Modo Oscuro.
- [ ] Contraste AA y áreas táctiles ≥ 44.
- [ ] Uso los componentes base o he añadido uno reutilizable documentado.
- [ ] No he tocado lógica de negocio, almacenamiento, anuncios ni `app.json`.
