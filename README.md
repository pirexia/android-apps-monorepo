# Android Apps Monorepo (Expo)

Monorrepo de micro-apps Android construidas con React Native + Expo Router,
TypeScript estricto, 100% offline y monetizadas con AdMob.

## Documentos clave

- Reglas globales: [`.clinerules`](.clinerules)
- Modos de agente: [`.roomodes`](.roomodes)
- Arquitectura y decisiones: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Catálogo de apps: [`apps/README.md`](apps/README.md)

## Principios

- **Cero Backend**: la lógica de negocio nunca depende de `fetch`, `axios` ni servicios HTTP.
- **Offline First**: toda utilidad funciona sin conexión; los anuncios fallan en silencio.
- **Privacidad**: sin permisos innecesarios (invariantes INV-001..INV-007).

## Estructura

```text
apps/<app-slug>/
├── app/          # Expo Router (index, settings, ...)
├── src/          # components, lib, theme
├── docs/         # REQUIREMENTS.md, PLAN.md, memory.md
├── app.json
├── package.json
└── tsconfig.json
```

Cada app es independiente y autocontenida. Consulta
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) para el detalle completo.
