# Plan — Calculadora de Calistenia (`calc-calistenia`)

> Entrada: [`REQUIREMENTS.md`](REQUIREMENTS.md) aprobado. Salida: tareas ordenadas para el
> `implementer` y el gate de cierre. Autor: System Architect.

## Estado

`review` (idea → planning → implementing → review → published → archived) — implementado y en gate de revisión

## Decisiones adoptadas

Resolución de las preguntas abiertas de [`REQUIREMENTS.md`](REQUIREMENTS.md:1):

| Pregunta | Decisión |
| --- | --- |
| Q-1 redondeo | 1 decimal (mitad hacia arriba) |
| Q-2 cadencia intersticial | Cada 3 cálculos válidos, máximo 1 por minuto |
| Q-3 historial | Se persiste el último cálculo (entradas + resultado) en local; sin historial múltiple |
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

- [x] 1. **Scaffold** de `apps/calc-calistenia` desde [`apps/_template`](../../_template/README.md:1):
      `create-expo-app` + copiar `app/`, `src/`, `docs/`, [`app.json`](../../_template/app.json:1)
      y [`tsconfig.json`](../../_template/tsconfig.json:1); `npx expo install` del stack.
      Configurar [`app.json`](../../_template/app.json:1) con la identidad de arriba y los
      plugins `expo-router` y `react-native-google-mobile-ads` con IDs de prueba (INV-002).
- [x] 2. **Lógica pura** en `src/lib/calistenia.ts`: `estimate1RM`, `volume`,
      `equivalentLoad`, `equivalentAddedWeight`, `validateInput` y redondeo a 1 decimal.
      Cubre CA-001…CA-005 y CA-008. Sin React ni red (INV-005).
- [x] 3. **Pantalla principal** [`app/index.tsx`](../../_template/app/index.tsx:1): inputs de
      peso corporal, lastre, repeticiones y repeticiones objetivo; toggle kg/lb; botón
      "Calcular"; resultados (1RM, volumen, carga equivalente, lastre equivalente) y
      mensajes de validación. Estilos con `StyleSheet.create` y [`useTheme()`](../../_template/src/theme/colors.ts:31).
- [x] 4. **Persistencia de unidad** en AsyncStorage vía [`src/lib/storage.ts`](../../_template/src/lib/storage.ts:1)
      (clave `unit`, valores `kg` | `lb`). Cubre CA-006 e INV-007.
- [x] 5. **Ajustes** [`app/settings.tsx`](../../_template/app/settings.tsx:1): versión y enlace
      a política de privacidad (INV-004). URL real pendiente del `legal-reviewer` (issue 1).
- [x] 6. **Anuncios**: [`AdBanner`](../../_template/src/components/AdBanner.tsx:1) con IDs de
      prueba (INV-002), intersticial con límite de frecuencia (CA-009) y consentimiento
      Google UMP antes de cargar anuncios (INV-008).
- [x] 7. **Tests** (Jest + Testing Library): fórmulas CA-001…CA-005 y CA-010, validación
      CA-008, errores de storage y pruebas de UI (render + interacción).
- [x] 8. **Gate de revisiones** en orden: `test-writer` → `security-reviewer` →
      `legal-reviewer` → `store-reviewer` → `doc-reviewer`.
- [x] 9. **Persistencia del último cálculo** (HU-005, CA-010): guardar en la clave `lastInput`
      y restaurar al montar la pantalla.
- [x] 10. **Política de privacidad in-app** ([`app/privacy.tsx`](../app/privacy.tsx:1)) enlazada
      desde ajustes y URL web opcional vía `expo.extra.privacyPolicyUrl` (INV-004 autónoma).
- [ ] 11. **Cierre DoD**: `memory.md` actualizado y estado `review` en [`CATALOG.md`](../../../CATALOG.md:24)
      y [`apps/README.md`](../../README.md:1); pendientes la verificación en modo avión (INV-003)
      y los bloqueos de publicación externos.
- [x] 12. **Rediseño visual + icono**: paleta navy/naranja (Dark/Light), componentes UI
      (`Button`, `Card`, `Field`, `SegmentedControl`), banner de anuncios a pie fijo e icono
      bicolor de mancuernas. Sincronizado también en [`apps/_template`](../../_template/README.md:1).

## Notas de arquitectura

- Rutas Expo Router: [`app/index.tsx`](../app/index.tsx:1) (utilidad),
  [`app/settings.tsx`](../app/settings.tsx:1) (ajustes) y [`app/privacy.tsx`](../app/privacy.tsx:1)
  (política de privacidad in-app, INV-004), apiladas en [`app/_layout.tsx`](../app/_layout.tsx:1).
- Paleta adaptativa Dark/Light vía [`useTheme()`](../../_template/src/theme/colors.ts:31).
- **Persistencia del último cálculo**: clave `lastInput` en AsyncStorage, reutilizando
  [`storage.ts`](../../_template/src/lib/storage.ts:1); se restaura al montar la pantalla (INV-007).
- Cada paso se ejecuta en un worktree desde `develop` según la norma de
  [`.clinerules`](../../../.clinerules): `git worktree add ../<app-slug>-<paso> -b feature/<app-slug>/<paso> develop`.
  Nota: `develop` está desactualizado (solo contiene `.clinerules`); el trabajo se hizo en la
  rama `feature/calc-calistenia/mvp` partiendo del HEAD con la base del monorrepo.

## Definición de Hecho (DoD)

- [x] Funcionalidad implementada en `apps/calc-calistenia` con TypeScript estricto y `StyleSheet`.
- [x] Tests unitarios pasando (5 suites, 28 tests).
- [x] `memory.md`, `PLAN.md` y `REQUIREMENTS.md` actualizados.
- [x] Pantalla de ajustes con política de privacidad in-app (INV-004).
- [x] Validación de seguridad superada (sin permisos extra, IDs de AdMob de prueba).
- [x] Cumplimiento legal revisado (INV-008) — identidad/URL de ficha pendientes (issue 1).
- [x] App empaquetada para Android (`expo export`) sin errores.
- [ ] Revisión de publicación (Play Store) superada — bloqueada por issues 1 y 2 (externas).
- [ ] App verificada en modo avión (INV-003) en dispositivo.
