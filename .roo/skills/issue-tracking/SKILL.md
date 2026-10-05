---
name: issue-tracking
description: >
  Crea y gestiona issues de GitHub para los hallazgos de las revisiones. Severidades
  BAJO/MEDIO/ALTO/CRITICO, convención de nombre por app y seguimiento del estado en
  apps/<app-slug>/docs/issues.md. Úsala al convertir cualquier hallazgo en issue.
---

# Issue Tracking

## Severidades

- **BAJO** — no bloquea; mejora opcional.
- **MEDIO** — debe corregirse antes del cierre.
- **ALTO** — riesgo real; se corrige de inmediato.
- **CRITICO** — bloquea el merge/cierre; se corrige antes que nada.

## Reglas

1. TODO hallazgo de revisión se convierte en issue de GitHub, sea cual sea su severidad.
2. Título: `[<app-slug>][<SEVERIDAD>] <título descriptivo>`
   (ej. `[tip-split][ALTO] app.json pide cámara sin justificación`).
3. Etiquetas: `severity/bajo|medio|alto|critico`, `app/<slug>` y `estado/abierto`.
4. Cuerpo: descripción, evidencia (ruta y línea), severidad, agente que lo detectó y pasos
   de reproducción.

## Flujo por severidad

- **BAJO**: el orquestador pregunta al usuario si se corrige o no. Si no, se cierra como
  `estado/descartado` con motivo.
- **MEDIO / ALTO / CRITICO**: se corrigen inmediatamente (`implementer` o `debug`),
  `test-writer` verifica y se cierra como `estado/corregido`.

## Documentación del estado

- Registrar TODO issue y cada cambio de estado en `apps/<app-slug>/docs/issues.md`:

  | ID | Severidad | Título | Origen | Estado | Enlace |
  | --- | --------- | ------ | ------ | ------ | ------ |

- Mantener el estado del issue en GitHub sincronizado con el registro.
- Nunca cerrar un issue sin reflejar el cierre en el registro.

## Cierre

- `estado/corregido`: con referencia al commit y test de regresión.
- `estado/descartado`: solo BAJO y con motivo aprobado por el usuario.
