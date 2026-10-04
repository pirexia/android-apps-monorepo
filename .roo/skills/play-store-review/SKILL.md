---
name: play-store-review
description: >
  Simula la revisión de Google Play antes de publicar. Comprueba ficha de Play Console, contenido,
  Data Safety, política de privacidad, anuncios, permisos y requisitos técnicos. Úsala antes de dar
  por lista una app para producción.
---

# Play Store Review (simulación de publicación)

## Objetivo

Revisar la app como lo haría Google Play y detectar bloqueos antes de subir el AAB.

## Checklist A — Contenido y ficha de Play Console

1. Título ≤ 30 caracteres y sin spam de keywords.
2. Descripción corta y completa cumplen las políticas (sin promesas falsas ni keywords repetidas).
3. Icono, feature graphic y capturas coherentes con la app.
4. Clasificación de contenido (IARC) cumplimentada y correcta.
5. Categoría y público objetivo reales.
6. Email de contacto y política de privacidad visibles.
7. Sin contenido engañoso, sensible, violento ni de odio.

## Checklist B — Privacidad y Data Safety

1. Ficha de Data Safety coherente con la política de privacidad (INV-008).
2. Si hay anuncios: se declara el identificador de publicidad.
3. Política de privacidad accesible y con contenido real de la app (no plantilla vacía).
4. Consentimiento UMP configurado para EEE/UK si los anuncios son personalizados.
5. Sin datos personales ni sensibles salvo justificación documentada.

## Checklist C — Anuncios y monetización

1. App marcada como "contiene anuncios".
2. IDs de prueba en desarrollo (INV-002); IDs reales solo en configuración de producción.
3. Los anuncios no inducen clics accidentales ni ocultan contenido.
4. Intersticiales con cierre claro y frecuencia razonable.

## Checklist D — Técnica de publicación

1. `app.json` sin permisos innecesarios (INV-006).
2. Target API level al día (exigencia de Google para actualizaciones).
3. Release como AAB firmado, `versionCode` incrementado y `versionName` coherente.
4. La app arranca sin crash y funciona en modo avión (INV-003).
5. Sin `fetch`/`axios` en lógica de negocio (INV-005).

## Salida

- Informe con severidades (BAJO/MEDIO/ALTO/CRITICO) convertidas en issues con la skill
  `issue-tracking`.
- Si hay bloqueo de publicación, indicarlo explícitamente.
