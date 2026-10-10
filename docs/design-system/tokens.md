# Design System — Tokens

> **Fuente única de verdad** del diseño de todas las apps del monorrepo.
> Todo modo `ui-designer` **lee este fichero antes de maquetar**. Prohibido inventar colores,
> radios, tamaños o espaciados sueltos: si falta un token, se añade aquí primero.
>
> Implementación de referencia: [`apps/_template/src/theme/colors.ts`](../../apps/_template/src/theme/colors.ts:1),
> [`apps/_template/src/theme/tokens.ts`](../../apps/_template/src/theme/tokens.ts:1)
> y componentes base en `apps/_template/src/components/ui/`.

## Paper como capa de render (`react-native-paper@5`)

Decisión [`chore(root)`](../../../apps/calc-calistenia/docs/PLAN.md:1): `react-native-paper` se
usa **solo como capa de render** de los componentes base (`Button`, `Card`, `SegmentedControl`).
**No es fuente de color**: la paleta sigue viviendo en [`colors.ts`](../../apps/_template/src/theme/colors.ts:1)
y en este fichero. El puente [`paperTheme.ts`](../../apps/_template/src/theme/paperTheme.ts:1)
traduce los roles propios a roles MD3 **sin introducir hex nuevos**:

| Rol propio | Rol MD3 (Paper) |
| --- | --- |
| `primary` | `primary` |
| `onPrimary` | `onPrimary` |
| `primarySoft` | `primaryContainer` / `secondaryContainer` |
| `primaryText` | `onPrimaryContainer` / `onSecondaryContainer` / `secondary` / `tertiary` |
| `background` / `surface` / `surfaceAlt` | `background` / `surface` / `surfaceVariant` |
| `text` / `textSecondary` | `onBackground` + `onSurface` / `onSurfaceVariant` |
| `border` | `outline` / `outlineVariant` |
| `danger` | `error` |

Regla al usar Paper: los colores se pasan explícitos desde `useTheme()` o mediante el
`PaperProvider` con `usePaperTheme()`; **nunca** se hardcodea un color en el JSX.

## 0. Estilo — "soft pastel"

Estética común a **todas** las apps: minimalista, luminosa y de contraste alto. Rasgos:

- **Color pastel como relleno, tinta profunda como texto.** Los rellenos son pasteles suaves;
  el texto sobre ellos es una **tinta oscura del mismo tono** (nunca blanco sobre pastel).
- **Líneas claras.** La definición la dan bordes finos de 1 px (`border`), no sombras duras.
- **Botones modernos.** Formas redondeadas (radio `lg`) y alto ≥ 52, con feedback al pulsar.
- **Una sola interfaz, acento por app.** La **estructura es idéntica** en todas las apps
  (ver [`app-pattern.md`](app-pattern.md:1)); lo único que cambia es el **color de acento**
  (§9). Los neutros son compartidos.

## 1. Marca y modelo de acento

El sistema es **monocromo por app**: cada app elige **un** acento del catálogo (§9) y lo aplica
en todo (botón primario, enlaces, hero, segmento activo). No se mezclan dos acentos en una app.

| Rol | Token | Descripción |
| --- | --- | --- |
| Relleno de acento | `primary` | Fondo de botón primario, chips y píldoras. Pastel. |
| Relleno pulsado | `primaryPressed` | Estado `pressed` del relleno. |
| **Tinta sobre acento** | `onPrimary` | Texto/ícono **encima** de `primary`. Tinta profunda. |
| Fondo teñido | `primarySoft` | Hero y superficies teñidas muy claras. |
| **Tinta de acento** | `primaryText` | Texto de acento (enlaces, valor del hero, segmento activo). |
| Borde de acento | `primaryBorder` | Borde fino cuando el acento delimita. |

> Regla de contraste: `onPrimary`/`primaryText` son **oscuros** en Modo Claro y **claros** en
> Modo Oscuro, ajustándose al fondo. Así el pastel siempre va acompañado de texto legible (AA).

## 2. Colores semánticos (Light / Dark)

Neutros **compartidos por todas las apps**. Se consumen vía `useTheme()`.

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `background` | `#F6F8F9` | `#0F1512` | Fondo de pantalla |
| `surface` | `#FFFFFF` | `#19211E` | Tarjetas / contenedores |
| `surfaceAlt` | `#EEF3F2` | `#222C28` | Inputs, segmentos, chips |
| `text` | `#14201D` | `#F1F5F3` | Texto principal |
| `textSecondary` | `#5E6E69` | `#A2B0AB` | Texto secundario / etiquetas |
| `placeholder` | `#9BA8A4` | `#73817C` | Placeholder de inputs |
| `border` | `#E2EAE8` | `#2B3531` | Bordes y separadores (líneas claras) |
| `danger` | `#C0392B` | `#FF8A80` | Errores |
| `success` | `#0B6B4F` | `#4ADE97` | Confirmaciones |

Acento (van en el bloque por app, §9): `primary`, `primaryPressed`, `onPrimary`, `primarySoft`,
`primaryText`, `primaryBorder`.

## 3. Tipografía

Familia: la del sistema (San Francisco / Roboto). Sin fuentes externas.
Implementadas en [`tokens.ts`](../../apps/_template/src/theme/tokens.ts:1) (`typography`).

| Token | Tamaño | Peso | Line-height | Uso |
| --- | --- | --- | --- | --- |
| `display` | 32 | 800 | 38 | Dato principal (hero) |
| `title` | 26 | 800 | 32 | Título de pantalla |
| `heading` | 18 | 700 | 24 | Título de sección/tarjeta |
| `body` | 16 | 400 | 22 | Texto de párrafo |
| `bodyStrong` | 16 | 700 | 22 | Valores y etiquetas de dato |
| `label` | 13 | 600 | 18 | Etiquetas de campo (opcional mayúsculas) |
| `input` | 17 | 600 | 22 | Texto de campos (`Field`) |
| `caption` | 12 | 400 | 16 | Notas y ayudas |

Reglas: jerarquía por tamaño **y** peso; máximo 3 niveles visibles por pantalla. Mayúsculas solo
en etiquetas `label`.

## 4. Espaciado (base 4)

| Token | px | Uso típico |
| --- | --- | --- |
| `xs` | 4 | Separación mínima |
| `sm` | 8 | Gaps internos pequeños |
| `md` | 12 | Gap entre campos |
| `lg` | 16 | Padding de tarjeta |
| `xl` | 20 | Padding de pantalla |
| `xxl` | 24 | Márgenes amplios |
| `xxxl` | 32 | Separación de bloques |

Regla: padding de pantalla `xl` (20); gap entre tarjetas `lg` (16); padding interno de tarjeta
`lg` (16–18).

## 5. Radios

| Token | px | Uso |
| --- | --- | --- |
| `sm` | 10 | Segmentos, chips |
| `md` | 14 | Inputs |
| `lg` | 20 | Botones, tarjetas |
| `xl` | 24 | Tarjetas/hero destacados |
| `pill` | 999 | Selectores tipo píldora |
| `full` | 50 % | Iconos/círculos |

## 6. Sombras (suaves)

| Token | shadowColor | opacity | radius | offset | elevation (Android) |
| --- | --- | --- | --- | --- | --- |
| `card` | `#000000` | 0.05 | 12 | `{ width: 0, height: 6 }` | 2 |
| `elevated` | `#000000` | 0.08 | 20 | `{ width: 0, height: 10 }` | 4 |

Regla: la definición la da el **borde** (`border` 1 px), no una sombra dura. Sombras discretas.
Implementadas en [`tokens.ts`](../../apps/_template/src/theme/tokens.ts:1) (`shadow`).

## 7. Componentes base (referencia)

| Componente | Radios/anchos | Tokens de color |
| --- | --- | --- |
| `Button` | radio `lg`, alto ≥ 52 | `primary`+`onPrimary` (primary), `primarySoft`/`primaryText` (secondary), `border`/`primaryText` (ghost) |
| `Card` | radio `lg`, borde 1 px `border` | `surface` + sombra `card` |
| `Field` | radio `md`, borde 1 px `border` | `surfaceAlt`, `text`, `placeholder` |
| `SegmentedControl` | contenedor `lg`, segmento `sm` | `surfaceAlt` / `surface` + `primaryText` |
| `ScreenHeader` | — | `text` + `textSecondary` |
| `AdBanner` (pie) | contenedor ≥ 20 % alto + safe-area | fondo `background`, borde superior `border` |

## 8. Accesibilidad y reglas de oro

- Contraste mínimo **AA** (4.5:1 texto normal, 3:1 texto grande). El pastel es **relleno**; el
  texto va en tinta (`onPrimary`/`primaryText`), no en el color pastel sobre fondo claro.
- Área táctil mínima **44×44** (botón ≥ 52 de alto).
- Todo control usa `accessibilityRole` y, si aplica, `accessibilityLabel`.
- Modo Claro y Oscuro obligatorios; probar ambos antes de entregar.
- Prohibidos valores mágicos: si un número no está aquí, se añade al token correspondiente
  (`colors.ts`/`tokens.ts`).
- Sin dependencias de UI/iconos nuevas sin justificar y aprobar.

## 9. Catálogo de acentos por app

Cada app elige **un** acento y lo pega en su `src/theme/colors.ts` (`const accent`). Todos siguen
el modelo *relleno pastel + tinta legible* y cumplen AA.

| Acento | App | Light: `primary` / `primaryPressed` / `onPrimary` / `primarySoft` / `primaryText` / `primaryBorder` |
| --- | --- | --- |
| **mint** | `calc-calistenia` | `#CDEEE7` / `#B7E4DA` / `#17594F` / `#EAFBF7` / `#17594F` / `#B7E4DA` |
| coral | — | `#FFDCCF` / `#FFC9B8` / `#A63F26` / `#FFF0EA` / `#A63F26` / `#FFC9B8` |
| lavender | — | `#E0E2FF` / `#CFD3FF` / `#3A3FA8` / `#F0F1FF` / `#3A3FA8` / `#CFD3FF` |
| sky | — | `#D6EBFF` / `#C2E0FF` / `#1661A8` / `#EDF6FF` / `#1661A8` / `#C2E0FF` |
| amber | — | `#FFEDCC` / `#FFE1AC` / `#8A5A00` / `#FFF7E8` / `#8A5A00` / `#FFE1AC` |
| rose | — | `#FFDCE7` / `#FFC8DA` / `#A32454` / `#FFF0F4` / `#A32454` / `#FFC8DA` |

Variantes de Modo Oscuro (mismo acento): la tinta se aclara y `primarySoft` se oscurece.

| Acento | Dark: `primary` / `primaryPressed` / `onPrimary` / `primarySoft` / `primaryText` / `primaryBorder` |
| --- | --- |
| **mint** | `#C7ECE3` / `#AFE1D5` / `#103B33` / `#16332D` / `#6ED9C3` / `#2C5A4F` |
| coral | `#FFD0C2` / `#FFBEA9` / `#4A1E12` / `#3A241E` / `#FFAE97` / `#5C3A31` |
| lavender | `#DEDFFF` / `#C9CBFF` / `#23246B` / `#262852` / `#B7B9FF` / `#3E418A` |
| sky | `#D2E9FF` / `#BCDEFF` / `#0F3D69` / `#16324A` / `#9FCEFF` / `#2C5A80` |
| amber | `#FFE9C2` / `#FFDB9E` / `#4A3000` / `#3A2E14` / `#FFD08A` / `#5C4820` |
| rose | `#FFD9E4` / `#FFC4D6` / `#5A1530` / `#3A2230` / `#FFA8C0` / `#6B3450` |

> Al crear una app nueva: copia la plantilla, sustituye el bloque `accent` por un acento libre
> del catálogo y anota aquí qué acento usa la app.
