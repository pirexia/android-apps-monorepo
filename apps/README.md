# Registro de Apps

Este fichero es el **registro de apps existentes**. La fuente de ideas y prioridades está
en el [`CATALOG.md`](../CATALOG.md) de la raíz.

Cada app vive en `apps/<slug>` y es independiente: `package.json`, `app.json`,
`tsconfig.json` y carpeta `app/` de Expo Router propios.

## Apps existentes

| App | Slug | Estado | Versión | Documentación |
| --- | ---- | ------ | ------- | ------------- |
| Plantilla canónica | `_template` | plantilla | - | [`REQUIREMENTS.md`](_template/docs/REQUIREMENTS.md) · [`PLAN.md`](_template/docs/PLAN.md) · [`memory.md`](_template/docs/memory.md) |

## Estados válidos

`idea` → `planning` → `implementing` → `review` → `published` → `archived`

## Reglas

- Una PR o commit afecta estrictamente a una única app (`apps/<slug>`).
- Cada app nueva parte de [`apps/_template`](_template/README.md).
- La documentación viva de cada app está en `apps/<slug>/docs/`.
- Al publicar una app, actualiza aquí su `Estado` y `Versión`, y márcala en
  [`CATALOG.md`](../CATALOG.md).
