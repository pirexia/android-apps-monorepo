# Memory — Calculadora de Calistenia (`calc-calistenia`)

> Bitácora de progreso. Se actualiza al terminar cada tarea.

## Estado

`review` (idea → planning → implementing → review → published → archived)

## Qué se ejecutó

- **Spec y plan**: [`REQUIREMENTS.md`](REQUIREMENTS.md) aprobado por el usuario y
  [`PLAN.md`](PLAN.md) redactado por el architect.
- **Scaffold** de `apps/calc-calistenia` con Expo SDK 57 (manual, sin `create-expo-app`,
  para conservar los `docs/` ya existentes):
  - [`package.json`](../package.json): `main: expo-router/entry`, scripts `typecheck` y
    `test`, preset `jest-expo`.
  - [`app.json`](../app.json): nombre "Calculadora de Calistenia", slug `calc-calistenia`,
    scheme `calc-calistenia`, package `com.calccalistenia.app`, plugins `expo-router` y
    `react-native-google-mobile-ads` con IDs de prueba (INV-002).
- **Código**:
  - [`src/lib/calistenia.ts`](../src/lib/calistenia.ts): lógica pura (Epley, volumen,
    carga/lastre equivalente, validación y redondeo a 1 decimal).
  - [`app/index.tsx`](../app/index.tsx): pantalla principal con inputs, toggle kg/lb,
    resultados y mensajes de validación.
  - Persistencia de unidad en AsyncStorage vía [`src/lib/storage.ts`](../src/lib/storage.ts)
    (clave `unit`).
  - [`app/settings.tsx`](../app/settings.tsx): ajustes con enlace a política de privacidad
    (INV-004; URL real pendiente del `legal-reviewer`).
  - [`src/components/AdBanner.tsx`](../src/components/AdBanner.tsx) y
    [`src/components/AdInterstitial.tsx`](../src/components/AdInterstitial.tsx): banner e
    intersticial con IDs de prueba (INV-002) y límite de frecuencia (cada 3 cálculos
    válidos, máx 1 por minuto).
  - [`src/lib/ads.ts`](../src/lib/ads.ts): inicialización del SDK con consentimiento UMP
    vía `AdsConsent.gatherConsent` (INV-008).
- **Verificación**: `npx tsc --noEmit` limpio; `npx jest --ci` → 2 suites, 7 tests en verde.

## Qué falló (y cómo se resolvió)

- `npx expo install` → `EALLOWSCRIPTS` (npm 12 no admite `--allow-scripts` en installs de
  proyecto). Se instaló con `npm install` directo usando las versiones de
  `node_modules/expo/bundledNativeModules.json`.
- `react-native-ump-consent` no existe en npm (404): la UMP está integrada en
  `react-native-google-mobile-ads` v17 como `AdsConsent.gatherConsent`.
- `@testing-library/react-native@14` cambió a API async con peer `test-renderer`: se fijó
  `13.3.3` (API sync, React 19).
- Conflicto de peers con `react-dom@19.3` (peer opcional de expo): instalación con
  `--legacy-peer-deps`.
- Globales de Jest no resueltos por `tsc` (TypeScript 6): se añadió `"types": ["jest"]`
  en [`tsconfig.json`](../tsconfig.json).

## Siguiente paso

- Gate de revisiones en orden: `test-writer` → `security-reviewer` → `legal-reviewer` →
  `store-reviewer` → `doc-reviewer`.
- `legal-reviewer` debe fijar la URL real de la política de privacidad en
  [`app/settings.tsx`](../app/settings.tsx).
- Iconos y splash screen pendientes (store-reviewer / EAS).

## Actualización — persistencia del último cálculo (HU-005, CA-010)

- **Qué se ejecutó**: [`REQUIREMENTS.md`](REQUIREMENTS.md) actualizado (HU-005, CA-010,
  INV-007, Q-3 resuelto). [`app/index.tsx`](../app/index.tsx) guarda el último cálculo en
  AsyncStorage (clave `lastInput`) al pulsar "Calcular" y lo restaura al abrir la app.
- **Verificación**: `npx tsc --noEmit` limpio; `npx jest --ci` → 4 suites, **27 tests en verde**.
- **Qué falló**: nada funcional; el test de restauración emite avisos `act(...)` no fatales
  (actualización asíncrona del `useEffect` al restaurar el estado).
- **Siguiente paso**: `legal-reviewer` ajusta [`LEGAL.md`](LEGAL.md) para reflejar que los
  valores del último cálculo se guardan localmente (y no se transmiten).

## Actualización — cierre de hallazgos de revisión

- **Docs sincronizadas** (issues 8, 9, 10, 12, 14): [`CATALOG.md`](../../../CATALOG.md:24)
  (estado `review`), [`apps/README.md`](../../README.md:13),
  [`SECURITY_REVIEW.md`](SECURITY_REVIEW.md:1), [`issues.md`](issues.md:1),
  [`PLAN.md`](PLAN.md:8) (estado, tareas y Q-3) y CA-004 de [`REQUIREMENTS.md`](REQUIREMENTS.md:59).
- **Config de publicación** (issues 2, 4): assets de marcador en `assets/` (`icon`,
  `adaptive-icon`, `splash-icon`, `favicon`, `feature-graphic`); [`app.json`](../app.json:1)
  con `icon`/`splash`, `android.versionCode` e `ios.buildNumber`; y [`eas.json`](../eas.json:1)
  con perfiles development/preview/production.
- **Anuncios** (issues 3, 7): IDs configurables vía `expo.extra.admob` (test IDs por defecto,
  INV-002); intersticial alineado con el banner (sin forzar no personalizados; gestiona UMP).
- **Verificación**: `npx expo config` válido; `tsc --noEmit` limpio; `jest` → 4 suites, 27 tests.
- **Pendientes externos** (no resolubles en repo): identidad/NIF/email y publicación de la
  política en URL pública (issue 1), IDs reales de AdMob (cuenta AdMob), ficha + Data Safety en
  Play Console (issues 5, 6), capturas de pantalla y verificación en modo avión en dispositivo.
