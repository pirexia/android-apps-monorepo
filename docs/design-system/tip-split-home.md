# Diseño — Pantalla principal de TipSplit (`tip-split`)

> Spec de diseño (modo `ui-designer`) aplicando [`tokens.md`](tokens.md:1). Minimalista, tarjetas
> con sombras suaves y soporte perfecto Dark/Light. Es el **ejemplo de referencia** del sistema de
> diseño para el resto de apps.
>
> Estado del catálogo: `idea` ([`CATALOG.md`](../../CATALOG.md:41)). Esta spec es la referencia de
> diseño; su implementación seguirá el flujo spec → plan → implementer.

## 1. Objetivo

Dividir la cuenta entre varias personas con propina y redondeo, en **una sola pantalla**, offline
y sin recoger datos personales.

## 2. Jerarquía (de arriba a abajo)

1. **Título** de pantalla (`title`).
2. **Hero de resultado**: cuánto paga **cada persona** (`display` en `primaryText`, fondo `primarySoft`).
3. **Tarjeta de entradas**: importe total, número de personas, propina (%) y redondeo.
4. **Tarjeta de desglose**: propina, total con propina, por persona.
5. **Enlace** a Ajustes (`primary`).
6. **Banner** fijo a pie (~20 % + safe-area).

## 3. Wireframe

```text
┌─────────────────────────────────────┐
│  Propinas y División                │  title (26/800, text)
│  Divide la cuenta en segundos.      │  caption (12/400, textSecondary)
│                                     │
│  ┌───────────────────────────────┐  │
│  │  CADA PERSONA PAGA            │  │  hero: surface=primarySoft, radio lg
│  │  23,50 €                      │  │  label (13/600) + display (32/800, primaryText)
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Importe total (€)            │  │  Card (surface, borde, sombra card)
│  │  [ Ej. 100,00              ]  │  │  Field (surfaceAlt, radio md)
│  │  Personas                     │  │
│  │  [ Ej. 4                   ]  │  │
│  │  Propina                      │  │
│  │  [ 0% | 5% | 10% | 15% ]      │  │  SegmentedControl (surfaceAlt/surface)
│  │                               │  │
│  │  [        Calcular        ]   │  │  Button primary (radio lg, alto ≥ 52)
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Desglose                     │  │  Card
│  │  Propina          10,00 € ▸   │  │  fila label/textSecondary + valor/text
│  │  Total            110,00 €    │  │
│  │  Por persona      27,50 €     │  │
│  └───────────────────────────────┘  │
│                                     │
│           Abrir ajustes             │  enlace (primary)
├─────────────────────────────────────┤
│            [ AdMob banner ]         │  pie fijo, borde superior, safe-area
└─────────────────────────────────────┘
```

## 4. Componentes y tokens usados

| Elemento | Componente | Tokens |
| --- | --- | --- |
| Fondo | — | `background` |
| Hero | `View` | `primarySoft`, radio `lg`, label `textSecondary`, valor `primaryText`/`display` |
| Tarjetas | `Card` | `surface`, `border`, radio `lg`, sombra `card` |
| Campos | `Field` | `surfaceAlt` + borde `border`, `text`, `placeholder` (ejemplos con `Ej. `), radio `md` |
| Propina | `SegmentedControl` | `surfaceAlt` / `surface`, activo `primary` |
| Botón | `Button` (primary) | relleno `primary`, tinta `onPrimary`, radio `lg`, alto ≥ 52 |
| Enlace | `Link` | `primaryText`, `bodyStrong` |
| Banner | `AdBanner` | pie ≥ 20 %, borde `border`, IDs de prueba (INV-002) |

Espaciado: padding de pantalla `xl` (20), gap entre tarjetas `lg` (16), padding interno `lg`.
Tipografía: `title` → `display` (hero) → `heading` (secciones) → `bodyStrong` (valores).

## 5. Estados

- **Inicial**: campos vacíos con placeholders `Ej.`; el hero muestra `— , — €` o se oculta.
- **Calculado**: hero con el importe por persona; tarjeta de desglose visible.
- **Error de validación**: texto `danger` bajo el campo (importe > 0, personas entero ≥ 1).
- **Offline**: todo funciona; el banner falla en silencio (INV-003).
- **Persistencia** (INV-007): se conserva la última entrada al reabrir (AsyncStorage).

## 6. Dark / Light

- Se usa `useTheme()`; **ningún** hex fijo en la pantalla.
- `primarySoft` cambia de `#EAFBF7` (claro) a `#16332D` (oscuro): el hero sigue destacando sin
  deslumbrar; el valor usa `primaryText` (`#17594F` claro / `#6ED9C3` oscuro) para mantener AA.
- Sombras `card` discretas; en oscuro el peso visual lo da el `surface` sobre `background`.

## 7. Accesibilidad

- Hero con `accessibilityLabel` "Cada persona paga X euros".
- Selector de propina con `accessibilityRole="button"` y `accessibilityState={{ selected }}`.
- Áreas táctiles ≥ 44; contraste AA.

## 8. Notas para implementer

- Reutiliza `src/components/ui` (`Button`, `Card`, `Field`, `SegmentedControl`) de la plantilla.
- Lógica pura separada en `src/lib/` (cálculo de división/propina) y testeable sin React.
- Sin `fetch`/`axios` (INV-005); persistencia solo `AsyncStorage` (INV-007).
- Ajustes con política de privacidad (INV-004) y banner con IDs de prueba (INV-002).
- DoD de diseño: pantalla correcta en Claro y Oscuro, sin valores mágicos y con los tokens de
  [`tokens.md`](tokens.md:1).
