# Design System — Tokens

> **Fuente única de verdad** del diseño de todas las apps del monorrepo.
> Todo modo `ui-designer` **lee este fichero antes de maquetar**. Prohibido inventar colores,
> radios, tamaños o espaciados sueltos: si falta un token, se añade aquí primero.
>
> Implementación de referencia: [`apps/_template/src/theme/colors.ts`](../../apps/_template/src/theme/colors.ts:1)
> y componentes base en `apps/_template/src/components/ui/`.

## 1. Marca (brand)

Paleta de marca **bicolor: tinta navy + acento naranja** (estilo "fitness/utilities" moderno).

| Token | Hex | Uso |
| --- | --- | --- |
| `brand.orange` | `#FF6A3D` | Acento principal, CTAs, datos destacados |
| `brand.orangeStrong` | `#E8542B` | Estado pulsado del acento |
| `brand.navy` | `#0F1220` | Fondo en modo oscuro / tinta de marca |
| `brand.white` | `#FFFFFF` | Texto sobre acento, superficies en modo claro |

## 2. Colores semánticos (Light / Dark)

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `background` | `#F4F5FB` | `#0F1220` | Fondo de pantalla |
| `surface` | `#FFFFFF` | `#191D30` | Tarjetas / contenedores |
| `surfaceAlt` | `#E9EBF4` | `#252A42` | Inputs, segmentos, chips |
| `text` | `#151829` | `#F1F3FA` | Texto principal |
| `textSecondary` | `#5D6579` | `#9AA3BC` | Texto secundario / etiquetas |
| `placeholder` | `#A0A7BA` | `#6B7590` | Placeholder de inputs |
| `primary` | `#FF6A3D` | `#FF7A4D` | Acento, botón primario, enlaces |
| `primaryPressed` | `#E8542B` | `#E8643A` | Estado pulsado |
| `onPrimary` | `#FFFFFF` | `#FFFFFF` | Texto sobre `primary` |
| `primarySoft` | `#FFE9DF` | `#3A2822` | Fondo teñido (hero, chips) |
| `border` | `#E4E7F0` | `#2B3150` | Bordes y separadores |
| `danger` | `#D92D20` | `#FF6B60` | Errores |
| `success` | `#12805C` | `#34D399` | Confirmaciones |

Reglas: **nunca** colores fijos en los componentes; se consumen vía `useTheme()`. Toda pantalla
se valida en Claro **y** Oscuro.

## 3. Tipografía

Familia: la del sistema (San Francisco / Roboto). Sin fuentes externas.

| Token | Tamaño | Peso | Line-height | Uso |
| --- | --- | --- | --- | --- |
| `display` | 32 | 800 | 38 | Dato principal (hero) |
| `title` | 26 | 800 | 32 | Título de pantalla |
| `heading` | 18 | 700 | 24 | Título de sección/tarjeta |
| `body` | 16 | 400 | 22 | Texto de párrafo |
| `bodyStrong` | 16 | 700 | 22 | Valores y etiquetas de dato |
| `label` | 13 | 600 | 18 | Etiquetas de campo (opcional mayúsculas) |
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
| `2xl` | 24 | Márgenes amplios |
| `3xl` | 32 | Separación de bloques |

Regla: padding de pantalla `xl` (20); gap entre tarjetas `lg` (16); padding interno de tarjeta
`lg` (16–18).

## 5. Radios

| Token | px | Uso |
| --- | --- | --- |
| `sm` | 10 | Segmentos, chips |
| `md` | 14 | Botones, inputs |
| `lg` | 20 | Tarjetas |
| `pill` | 999 | Selectores tipo píldora |
| `full` | 50 % | Iconos/círculos |

## 6. Sombras (suaves)

| Token | shadowColor | opacity | radius | offset | elevation (Android) |
| --- | --- | --- | --- | --- | --- |
| `card` | `#000000` | 0.05 | 12 | `{ width: 0, height: 6 }` | 2 |
| `elevated` | `#000000` | 0.08 | 20 | `{ width: 0, height: 10 }` | 4 |

Regla: la definición la da el **borde** (`border` 1 px), no una sombra dura. Sombras discretas.

## 7. Componentes base (referencia)

| Componente | Radios/anchos | Tokens de color |
| --- | --- | --- |
| `Button` | radio `md`, alto ≥ 48 | `primary`/`onPrimary`, `primarySoft`, borde `border` (ghost) |
| `Card` | radio `lg`, borde 1 px | `surface`, `border`, sombra `card` |
| `Field` | radio `md`, "filled" sin borde | `surfaceAlt`, `text`, `placeholder` |
| `SegmentedControl` | contenedor `md`, segmento `sm` | `surfaceAlt` / `surface` + `primary` |
| `AdBanner` (pie) | contenedor ≥ 20 % alto + safe-area | fondo `background`, borde superior `border` |

## 8. Accesibilidad y reglas de oro

- Contraste mínimo **AA** (4.5:1 texto normal, 3:1 texto grande).
- Área táctil mínima **44×44**.
- Todo control usa `accessibilityRole` y, si aplica, `accessibilityLabel`.
- Modo Claro y Oscuro obligatorios; probar ambos antes de entregar.
- Prohibidos valores mágicos: si un número no está aquí, se añade al token correspondiente.
- Sin dependencias de UI/iconos nuevas sin justificar y aprobar.
