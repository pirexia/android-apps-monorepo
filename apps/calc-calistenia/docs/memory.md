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

## Actualización — cierre: política de privacidad in-app y empaquetado

- **Política de privacidad in-app** (INV-004): nueva pantalla [`privacy.tsx`](../app/privacy.tsx:1)
  enlazada desde [`settings.tsx`](../app/settings.tsx:1); la app ya **no depende de una URL
  externa**. La versión web (para la ficha de Play) es opcional vía `expo.extra.privacyPolicyUrl`.
- **Empaquetado validado**: `npx expo export --platform android` → bundle Hermes correcto
  (1375 módulos, sin errores).
- **Verificación**: `tsc --noEmit` limpio; `jest` → **5 suites, 28 tests** en verde.
- **Entorno de build**: sin Java/Android SDK/gradle → el APK/AAB se genera fuera
  (EAS `preview`/`production` o Android Studio).
- **Chequeo de salud**: `expo-doctor` → **21/21 OK**. Se retiraron `newArchEnabled` y `splash`
  de [`app.json`](../app.json:1) por no ser válidos en el esquema de SDK 57.

## Incidencia de build nativo — `react-native-google-mobile-ads` (resuelta)

- **Síntoma**: `./gradlew assembleDebug` fallaba con «Cannot get property
  'googleMobileAdsJson' on extra properties extension as it does not exist» y «does not
  specify compileSdk» en el proyecto `:react-native-google-mobile-ads`.
- **Causa raíz**: con Expo, el plugin solo escribe la propiedad Gradle `RNGMA_ANDROID_BACKEND`
  si se le pasa la opción `androidSdk`. Sin ella, `build.gradle` (línea ~123) evalúa
  `rootProject.ext.googleMobileAdsJson` sin `findProperty`; además `app-json.gradle` define por
  error `googleAdsJson` (nombre distinto) en esa rama. El segundo error (compileSdk) es
  consecuencia del primero.
- **Arreglo**: añadir `"androidSdk": "classic"` a la config del plugin en [`app.json`](../app.json:10)
  (y en la plantilla [`apps/_template/app.json`](../../_template/app.json:1)). Así el `?:` hace
  cortocircuito y no evalúa `googleMobileAdsJson`.
- **Verificación (test de regresión = el propio build)**: `npx expo prebuild -p android --clean`
  + `./gradlew assembleDebug` → **BUILD SUCCESSFUL**; APK en
  `android/app/build/outputs/apk/debug/app-debug.apk`.

## Actualización — rediseño visual, icono y banner fijo

- **Qué se ejecutó**:
  - **Icono bicolor** (mancuernas, tinta navy `#0F1220` + naranja `#FF6A3D`) generado sin
    dependencias externas para [`icon.png`](../assets/icon.png), [`adaptive-icon.png`](../assets/adaptive-icon.png),
    [`splash-icon.png`](../assets/splash-icon.png), [`favicon.png`](../assets/favicon.png) y
    [`feature-graphic.png`](../assets/feature-graphic.png). `backgroundColor` del icono adaptativo
    actualizado a `#0F1220` en [`app.json`](../app.json:24).
  - **Paleta moderna** en [`src/theme/colors.ts`](../src/theme/colors.ts:1): navy + naranja,
    con `surfaceAlt`, `primarySoft`, `onPrimary`, `danger` y `success` (Dark/Light).
  - **Sistema de diseño** en [`src/components/ui/`](../src/components/ui/Button.tsx:1):
    [`Button`](../src/components/ui/Button.tsx:1) (primary/secondary/ghost),
    [`Card`](../src/components/ui/Card.tsx:1), [`Field`](../src/components/ui/Field.tsx:1) y
    [`SegmentedControl`](../src/components/ui/SegmentedControl.tsx:1).
  - **Pantallas rediseñadas**: [`app/index.tsx`](../app/index.tsx:1) (tarjetas, hero de 1RM,
    inputs "filled", selector kg/lb tipo píldora) y [`app/settings.tsx`](../app/settings.tsx:1).
  - **Banner fijo** a pie de pantalla en [`app/index.tsx`](../app/index.tsx:301) (siempre visible,
    fuera del scroll), manteniendo IDs de prueba (INV-002) y fallo silencioso (INV-003).
  - **Plantilla** [`apps/_template`](../../_template/README.md:1) sincronizada con la misma paleta
    y componentes UI para que las próximas apps hereden el diseño.
- **Verificación**: `tsc --noEmit` limpio; `jest --ci` → **5 suites, 28 tests** en verde
  (avisos `act(...)` no fatales, ya conocidos).
- **Qué falló**: nada funcional. En `_template` aparecen errores de `tsc` porque es una carpeta
  fuente sin `node_modules` propio (se resuelven al copiarla a una app real); no afecta al build.
- **Siguiente paso**: validar el look & feel en dispositivo/emulador y, si procede, regenerar las
  capturas para la ficha de Play.

## Actualización — banner visible, placeholders de ejemplo y guía AdMob

- **Banner**: se usa `LARGE_ANCHORED_ADAPTIVE_BANNER` (formato anclado más grande) en
  [`AdBanner.tsx`](../src/components/AdBanner.tsx:17) y el pie reserva ~20 % de la pantalla con
  `paddingBottom` del safe-area. [`app/_layout.tsx`](../app/_layout.tsx:1) envuelve el árbol en
  `SafeAreaProvider` para que el anuncio **no quede bajo la barra de navegación de Android**.
- **Placeholders**: los campos muestran `Ej. 80`, `Ej. 0`, `Ej. 10`, `Ej. 5` y un color propio
  (`placeholder` en el tema) para dejar claro que el campo está vacío.
- **Verificación**: `tsc --noEmit` limpio; `jest --ci` → **5 suites, 28 tests** en verde (se añadió
  el mock de `react-native-safe-area-context` en [`index.test.tsx`](../__tests__/index.test.tsx:38)).
- **APK release** regenerado (`android/app/build/outputs/apk/release/app-release.apk`, 90,8 MB);
  se verificó que el bundle embebido contiene los cambios (`Ej.` y `LARGE_ANCHORED_ADAPTIVE_BANNER`).
- **Docs nuevas (comunes al monorrepo)**: [`docs/ADMOB_SETUP.md`](../../../docs/ADMOB_SETUP.md:1)
  (configurar AdMob e inyectar IDs reales) y [`docs/LEGAL_IDENTITY.md`](../../../docs/LEGAL_IDENTITY.md:1)
  (identidad legal común: responsable, NIF, email, URL). **Pendiente**: aportar los valores reales
  para sustituir los placeholders en [`LEGAL.md`](LEGAL.md:31) y [`privacy.tsx`](../app/privacy.tsx:6).

## Actualización — integración react-native-paper (capa de render)

- **Qué se ejecutó**: dependencias `react-native-paper@5.15.3` y `@expo/vector-icons@15.1.1`
  (con `npm install --legacy-peer-deps`); puente de tema
  [`src/theme/paperTheme.ts`](../src/theme/paperTheme.ts:1) que traduce `colors.ts` → roles MD3;
  `PaperProvider` en [`app/_layout.tsx`](../app/_layout.tsx:1); `Button`/`Card`/`SegmentedControl`
  montados sobre primitivas Paper. `Field` y `ScreenHeader` se mantienen nativos. Helper de tests
  `test-utils/render.tsx` y mock ampliado de `react-native-safe-area-context`.
- **Verificación**: `npx tsc --noEmit` limpio; `npx jest --ci` → 5 suites, **28 tests en verde**.
- **Qué falló**: el mock de `react-native-safe-area-context` no exponía `SafeAreaInsetsContext`
  (requerido por `PaperProvider`) → `TypeError reading 'Consumer'`; resuelto ampliando el mock.
  El helper de render dentro de `__tests__/` se interpretaba como suite vacía → movido a
  `test-utils/`.
- **Siguiente paso**: `security-reviewer` (dependencias/supply-chain) y `doc-reviewer`.
