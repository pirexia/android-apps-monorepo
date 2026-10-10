# Revisión de Seguridad y Privacidad — `calc-calistenia`

> Agente: `security-reviewer` · Modo: solo lectura (no corrige) · Fecha: 2026-10-04

## Checklist (verificado contra el código)

| # | Punto | Resultado | Evidencia |
| --- | --- | --- | --- |
| 1 | `app.json` sin permisos innecesarios (INV-006) | ✅ Sin permisos declarados | [`app.json`](../app.json:1) |
| 2 | IDs de AdMob de prueba, sin IDs reales (INV-002) | ✅ Solo publisher de prueba `3940256099942544` | [`app.json`](../app.json:15), [`AdBanner.tsx`](../src/components/AdBanner.tsx:5), [`AdInterstitial.tsx`](../src/components/AdInterstitial.tsx:4) |
| 3 | Sin `fetch`/`axios` en lógica de negocio (INV-005) | ✅ Sin coincidencias en `app/` ni `src/` | búsqueda regex |
| 4 | Sin SDKs de analítica/telemetría/config remota | ✅ Dependencias limpias | [`package.json`](../package.json:6) |
| 5 | Pantalla de ajustes con política de privacidad (INV-004) | ⚠️ Enlace presente; URL placeholder | [`settings.tsx`](../app/settings.tsx:7) |
| 6 | Persistencia solo AsyncStorage con errores controlados (INV-003, INV-007) | ✅ Solo [`storage.ts`](../src/lib/storage.ts:1) con `try/catch` | búsqueda |
| 7 | Sin secretos/tokens en el código | ✅ Sin coincidencias | búsqueda |

Observaciones: consentimiento UMP antes de inicializar anuncios en [`ads.ts`](../src/lib/ads.ts:1)
(`AdsConsent.gatherConsent`, INV-008); el intersticial solicita anuncios no personalizados por
defecto. Tras la persistencia del último cálculo, los datos siguen siendo 100% locales.

## Hallazgo

| ID | Severidad | Título | Resolución |
| --- | --------- | ------ | ---------- |
| 1 | MEDIO→CRITICO (Play) | URL de política de privacidad placeholder (`https://example.com/privacy`) | `legal-reviewer` + `implementer`: publicar la política y fijar la URL |

## Veredicto

Sin hallazgos de seguridad/privacidad propios de la app más allá del anterior. Desde la
perspectiva de Play Store, ese hallazgo escala a CRITICO (ver [`issues.md`](issues.md:1)).

## Actualización — integración `react-native-paper` (dependencias)

Fecha: 2026-10-10 · Alcance: PR `chore(root)` #7 (capa de render en `_template` + pilotada en `calc-calistenia`).

| # | Punto | Resultado | Evidencia |
| --- | --- | --- | --- |
| 8 | Dependencias nuevas sin riesgo de supply-chain | ✅ MIT verificadas | `react-native-paper@5.15.3`, `@expo/vector-icons@15.1.1`, `@callstack/react-theme-provider@3.0.9`, `color@3.2.1`, `use-latest-callback@0.2.6` (todas MIT) |
| 9 | Sin permisos nuevos (INV-006) | ✅ `app.json` sin cambios | `git diff` de `app.json` vacío |
| 10 | Sin red en la lógica de negocio (INV-005) | ✅ sin `fetch`/`axios`/HTTP en el código nuevo | búsqueda en `paperTheme.ts`, componentes UI y `test-utils` |
| 11 | Sin analítica/telemetría | ✅ solo componentes de UI + tema | [`package.json`](../package.json:6) |
| 12 | `npm audit --omit=dev` | ⚠️ 27 vuln. preexistentes en el toolchain Expo (`@expo/cli`…); **ninguna** en Paper ni en sus deps | `npm audit --omit=dev` |

Veredicto: **sin hallazgos nuevos**. `react-native-paper` y sus dependencias directas no aparecen
en el audit de producción; las vulnerabilidades restantes pertenecen al toolchain de Expo y son
previas a esta PR. Paper es MIT/Callstack (verificado) y actúa solo como capa de render: sin
permisos, sin red y sin recogida de datos.
