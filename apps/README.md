# Catálogo de Apps

Cada app vive en `apps/<slug>` y es independiente: `package.json`, `app.json`,
`tsconfig.json` y carpeta `app/` de Expo Router propios.

| App | Slug | Estado | Documentación |
| --- | ---- | ------ | ------------- |
| Plantilla canónica | `_template` | plantilla | [`REQUIREMENTS.md`](_template/docs/REQUIREMENTS.md) · [`PLAN.md`](_template/docs/PLAN.md) · [`memory.md`](_template/docs/memory.md) |

## Estados válidos

`idea` → `planning` → `implementing` → `testing` → `security-review` → `done`

## Reglas de catálogo

- Una PR o commit afecta estrictamente a una única app (`apps/<slug>`).
- Cada app nueva debe partir de [`apps/_template`](_template/README.md).
- La documentación viva de cada app está en `apps/<slug>/docs/`.
