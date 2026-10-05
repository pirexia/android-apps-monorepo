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
