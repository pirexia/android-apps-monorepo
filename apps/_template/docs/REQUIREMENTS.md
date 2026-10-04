# Requisitos — <Nombre de la App>

> Rellena este documento antes de escribir código. Mantén el slug real de la app.

## 1. Visión

Describe en 2-3 frases qué problema resuelve la utilidad y por qué funciona 100% offline.

## 2. Usuarios objetivo

- ¿Quién la usa?
- ¿En qué contexto (sin conexión, uso rápido, etc.)?

## 3. Historias de usuario

- [ ] HU-001: Como usuario quiero ... para ...
- [ ] HU-002: Como usuario quiero ... para ...

## 4. Criterios de aceptación

- [ ] CA-001: Dado ... cuando ... entonces ...
- [ ] CA-002: Dado ... cuando ... entonces ...

## 5. Invariantes aplicables

Verifica el cumplimiento de los invariantes de [`.clinerules`](../../../.clinerules):

- [ ] INV-001: sin permisos de Cámara/Contactos/Ubicación/Micrófono salvo que sea vital.
- [ ] INV-002: IDs de AdMob de prueba en desarrollo.
- [ ] INV-003: funcionalidad completa en modo avión.
- [ ] INV-004: pantalla de ajustes con política de privacidad.
- [ ] INV-005: sin `fetch`/`axios` en la lógica de negocio.
- [ ] INV-006: sin permisos extra en `app.json`.
- [ ] INV-007: datos persistidos en AsyncStorage y robustos ante fallos.

## 6. Fuera de alcance

- Sin cuentas de usuario ni sincronización en la nube.
- Sin analítica ni telemetría.
