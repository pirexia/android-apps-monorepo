# Patrón de pantalla — común a todas las apps

> **Norma global** (skill `design-system`). Toda app del monorrepo construye su pantalla
> principal con esta estructura y con los tokens de [`tokens.md`](tokens.md:1). No es específico
> de ninguna app: `tip-split` solo se usa como ejemplo en [`tip-split-home.md`](tip-split-home.md:1).

## Estructura canónica (pantalla principal)

1. **Cabecera**: título (`title`) + subtítulo de una línea (`caption`, `textSecondary`).
2. **Hero de resultado** *(opcional)*: el dato principal de la app, en una caja `primarySoft`
   con etiqueta (`label`) y valor (`display`, color `primary`). Si la app no tiene un único dato
   central, se omite.
3. **Tarjeta(s) de entrada**: `Card` con `Field`/`SegmentedControl`; placeholders con prefijo
   `Ej. ` y color `placeholder`.
4. **Tarjeta de resultados**: `Card` con filas etiqueta/valor (`textSecondary` / `text`).
5. **Enlace a Ajustes**: obligatorio (INV-004), color `primary`.
6. **Banner de anuncios** fijo a pie: contenedor ≥ 20 % de alto + `safe-area` inferior,
   borde superior `border` (INV-002 IDs de prueba, INV-003 fallo silencioso).

## Reglas

- **Un dato principal por pantalla** como máximo; el resto son secundarios.
- Espaciado: padding de pantalla `xl` (20), gap entre tarjetas `lg` (16), padding interno `lg`.
- Estilos solo con `StyleSheet.create` + `useTheme()`; prohibidos los valores mágicos.
- **Dark y Light obligatorios**: la misma pantalla se revisa en ambos temas.
- Accesibilidad: contraste AA, áreas táctiles ≥ 44, `accessibilityRole`/`accessibilityLabel`.
- Reutiliza `src/components/ui` (`Button`, `Card`, `Field`, `SegmentedControl`) duplicados desde
  [`apps/_template`](../../apps/_template/README.md:1).

## Variantes por tipo de app

| Tipo | Hero | Entrada | Resultado |
| --- | --- | --- | --- |
| Calculadora (p. ej. `tip-split`, `calc-calistenia`) | dato principal (1RM, por persona…) | campos numéricos + segmentadores | desglose en filas |
| Temporizador (`pomodoro`, `tabata`) | cuenta atrás grande | ajustes de duración | estado/etiqueta |
| Test (`reaction-test`, `cps-test`) | marca obtenida | botón "empezar" | histórico local breve |
| Conversor (`unit-converter`) | valor convertido | dos campos + selector | equivalencias |

## Checklist (por pantalla)

- [ ] Sigue la estructura canónica (o justifica la variante).
- [ ] Usa solo tokens (`tokens.md`); sin valores mágicos.
- [ ] Correcta en Modo Claro y Oscuro.
- [ ] Contraste AA y áreas táctiles ≥ 44.
- [ ] Enlace a Ajustes presente (INV-004) y banner a pie con IDs de prueba (INV-002).
