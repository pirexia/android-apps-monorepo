# Plan — Calculadora de Calistenia (`calc-calistenia`)

> Entrada: [`REQUIREMENTS.md`](REQUIREMENTS.md) aprobado. Salida: tareas ordenadas para el
> `implementer` y el gate de cierre. Autor: System Architect.

## Estado

`planning` (idea → planning → implementing → review → published → archived)

## Decisiones adoptadas

Resolución de las preguntas abiertas de [`REQUIREMENTS.md`](REQUIREMENTS.md:1):

| Pregunta | Decisión |
| --- | --- |
| Q-1 redondeo | 1 decimal (mitad hacia arriba) |
| Q-2 cadencia intersticial | Cada 3 cálculos válidos, máximo 1 por minuto |
| Q-3 historial | Sin historial; solo se persiste la unidad |
| Q-4 límite de reps | Enteros ≥ 1, sin límite superior |

Decisiones estructurales:

- **Lógica pura separada de la UI**: las fórmulas viven en `src/lib/calistenia.ts` como
  funciones puras (sin React, sin AsyncStorage, sin red). Motivo: testabilidad directa de
  CA-001…CA-005 y CA-008 sin mockear nada.
- **Sin `packages/` compartido para esta app**: se copia [`apps/_template`](../../_template/README.md:1)
  y se adapta. Regla "duplicar de forma controlada antes que acoplar apps".
- **Sin dependencias nuevas** fuera del stack de la plantilla: `expo-router`,
  `react-native-safe-area-context`, `react-native-screens`, `expo-linking`,
  `expo-constants`, `expo-status-bar`, `@react-native-async-storage/async-storage` y
  `react-native-google-mobile-ads`. No hay servicio HTTP.
- **Unidad (kg/lb) en la pantalla principal**, no en ajustes: es un dato de uso frecuente.
  Ajustes solo muestra versión y enlace a política de privacidad (INV-004).
- **Identidad Android**: `name` "Calculadora de Calistenia", `slug` `calc-calistenia`,
  `scheme` `calc-calistenia`, `android.package` `com.calccalistenia.app`.

## Tareas

- [ ] 1. **Scaffold** de `apps/calc-calistenia` desde [`apps/_template`](../../_template/README.md:1):
      `create-expo-app` + copiar `app/`, `src/`, `docs/`, [`app.json`](../../_template/app.json:1)
      y [`tsconfig.json`](../../_template/tsconfig.json:1); `npx expo install` del stack.
      Configurar [`app.json`](../../_template/app.json:1) con la identidad de arriba y los
      plugins `expo-router` y `react-native-google-mobile-ads` con IDs de prueba (INV-002).
- [ ] 2. **Lógica pura** en `src/lib/calistenia.ts`: `estimate1RM`, `volume`,
      `equivalentLoad`, `equivalentAddedWeight`, `validateInput` y redondeo a 1 decimal.
      Cubre CA-001…CA-005 y CA-008. Sin React ni red (INV-005).
- [ ] 3. **Pantalla principal** [`app/index.tsx`](../../_template/app/index.tsx:1): inputs de
      peso corporal, lastre, repeticiones y repeticiones objetivo; toggle kg/lb; botón
      "Calcular"; resultados (1RM, volumen, carga equivalente, lastre equivalente) y
      mensajes de validación. Estilos con `StyleSheet.create` y [`useTheme()`](../../_template/src/theme/colors.ts:31).
- [ ] 4. **Persistencia de unidad** en AsyncStorage vía [`src/lib/storage.ts`](../../_template/src/lib/storage.ts:1)
      (clave `unit`, valores `kg` | `lb`). Cubre CA-006 e INV-007.
- [ ] 5. **Ajustes** [`app/settings.tsx`](../../_template/app/settings.tsx:1): versión y enlace
      a política de privacidad (INV-004). URL real pendiente del `legal-reviewer`.
- [ ] 6. **Anuncios**: [`AdBanner`](../../_template/src/components/AdBanner.tsx:1) con IDs de
      prueba (INV-002), intersticial con límite de frecuencia (CA-009) y consentimiento
      Google UMP antes de cargar anuncios (INV-008).
- [ ] 7. **Tests unitarios** (Jest + Testing Library): fórmulas con los ejemplos numéricos
      de CA-001…CA-005, validación CA-008 y smoke test de render de `index`.
- [ ] 8. **Gate de revisiones** en orden: `test-writer` → `security-reviewer` →
      `legal-reviewer` → `store-reviewer` → `doc-reviewer`.
- [ ] 9. **Cierre DoD**: [`memory.md`](memory.md) actualizado, estado `implementing`/`review`
      reflejado en [`CATALOG.md`](../../../CATALOG.md:24) y [`apps/README.md`](../../README.md:1),
      y verificación en modo avión (INV-003).

## Notas de arquitectura

- Rutas Expo Router: [`app/index.tsx`](../../_template/app/index.tsx:1) (utilidad) y
  [`app/settings.tsx`](../../_template/app/settings.tsx:1) (ajustes), apiladas en
  [`app/_layout.tsx`](../../_template/app/_layout.tsx:1).
- Paleta adaptativa Dark/Light vía [`useTheme()`](../../_template/src/theme/colors.ts:31).
- Cada paso se ejecuta en un worktree desde `develop` según la norma de
  [`.clinerules`](../../../.clinerules): `git worktree add ../<app-slug>-<paso> -b feature/<app-slug>/<paso> develop`.

## Definición de Hecho (DoD)

- [ ] Funcionalidad implementada en `apps/calc-calistenia` con TypeScript estricto y `StyleSheet`.
- [ ] Tests unitarios pasando.
- [ ] `memory.md`, `PLAN.md` y `REQUIREMENTS.md` actualizados.
- [ ] Pantalla de ajustes con política de privacidad (INV-004).
- [ ] Validación de seguridad superada (sin permisos extra, IDs de AdMob de prueba).
- [ ] Cumplimiento legal revisado (INV-008): política de privacidad y aviso legal.
- [ ] Revisión de publicación (Play Store) superada.
- [ ] App verificada en modo avión (INV-003).
