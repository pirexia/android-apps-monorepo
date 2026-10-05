# Issues — Calculadora de Calistenia (`calc-calistenia`)

Registro de hallazgos de revisión y su estado. Norma: skill `issue-tracking`.

| ID | Severidad | Título | Origen | Estado | Enlace |
| --- | --------- | ------ | ------ | ------ | ------ |
| 1 | CRITICO | Política de privacidad no publicada (URL e identidad placeholder) | security-reviewer / store-reviewer | en-progreso | texto legal listo; faltan identidad + URL pública |
| 2 | CRITICO | Faltan recursos de ficha (icono, feature graphic y capturas) | store-reviewer | en-progreso | assets de marcador + config; falta diseño final y capturas |
| 3 | ALTO | IDs de AdMob reales no configurados (test IDs en el código) | store-reviewer | en-progreso | IDs configurables vía `expo.extra.admob`; falta cuenta AdMob |
| 4 | ALTO | Sin AAB firmado ni `versionCode`/`versionName` de release | store-reviewer | en-progreso | `versionCode` + `eas.json`; falta build del AAB |
| 5 | MEDIO | Ficha de Play Console sin definir (título, descripciones, categoría, IARC, público, email) | store-reviewer | abierto | pendiente de crear en GitHub |
| 6 | MEDIO | Data Safety sin declarar | store-reviewer | abierto | pendiente de crear en GitHub |
| 7 | BAJO | El intersticial fuerza anuncios no personalizados mientras el banner no | legal-reviewer | corregido | implementer |
| 8 | MEDIO | `PLAN.md` desactualizado (estado, tareas y Q-3) | doc-reviewer | corregido | architect |
| 9 | MEDIO | `CATALOG.md` mantenía la app en estado `idea` | doc-reviewer | corregido | janitor |
| 10 | MEDIO | `apps/README.md` no listaba `calc-calistenia` | doc-reviewer | corregido | janitor |
| 11 | MEDIO | `issues.md` vacío pese a hallazgos | doc-reviewer | corregido | janitor |
| 12 | BAJO | Faltaba `SECURITY_REVIEW.md` | doc-reviewer | corregido | janitor |
| 13 | BAJO | `memory.md` no refleja el estado real de las revisiones | doc-reviewer | corregido | implementer |
| 14 | BAJO | CA-004 se expresa con una entrada inexistente ("1RM 90 kg") | doc-reviewer | corregido | spec-writer |

## Leyenda

- Severidad: `BAJO` / `MEDIO` / `ALTO` / `CRITICO`
- Origen: `security-reviewer` / `legal-reviewer` / `store-reviewer` / `doc-reviewer` / `test-writer` / otro
- Estado: `abierto` / `en-progreso` / `corregido` / `descartado`

## Detalle

### 1 · CRITICO · Política de privacidad no publicada (URL e identidad placeholder)

- **Evidencia**: [`app/settings.tsx`](../app/settings.tsx:7) usa `https://example.com/privacy`; [`LEGAL.md`](LEGAL.md:30) tiene `[NOMBRE O RAZÓN SOCIAL]`, `[NIF]`, `[EMAIL DE CONTACTO]`.
- **Corrección**: completar identidad, publicar [`LEGAL.md`](LEGAL.md:1) en una URL y fijarla en `settings.tsx`.

### 2 · CRITICO · Faltan recursos de ficha (icono, feature graphic y capturas)

- **Evidencia**: no existe `assets/`; [`app.json`](../app.json:1) sin `icon`/`splash`.
- **Corrección**: generar iconos/splash y capturas de pantalla.

### 3 · ALTO · IDs de AdMob reales no configurados (test IDs en el código)

- **Evidencia**: [`AdBanner.tsx`](../src/components/AdBanner.tsx:5), [`AdInterstitial.tsx`](../src/components/AdInterstitial.tsx:4), [`app.json`](../app.json:15).
- **Corrección**: IDs reales vía configuración de producción (INV-002).

### 4 · ALTO · Sin AAB firmado ni `versionCode`/`versionName` de release

- **Evidencia**: no hay `eas.json` ni AAB; [`app.json`](../app.json:1) sin `android.versionCode`.

### 5 · MEDIO · Ficha de Play Console sin definir

- **Descripción**: título, descripciones, categoría, IARC, público objetivo y email de contacto pendientes.

### 6 · MEDIO · Data Safety sin declarar

- **Descripción**: declarar "no se recogen datos" + uso del identificador de publicidad por AdMob.

### 7 · BAJO · Intersticial no personalizado y banner estándar

- **Evidencia**: [`AdInterstitial.tsx`](../src/components/AdInterstitial.tsx:7) vs. banner.
- **Descripción**: inconsistencia menor; unificar si se desea.

### 8 · MEDIO · `PLAN.md` desactualizado

- **Evidencia**: [`PLAN.md`](PLAN.md:8) en estado `planning`; tareas sin marcar; [`PLAN.md`](PLAN.md:18) Q-3 "sin historial; solo unidad".
- **Corrección**: `architect` actualiza estado, tareas y Q-3.

### 9 · MEDIO · `CATALOG.md` mantenía la app en estado `idea` (corregido)

- **Evidencia**: [`CATALOG.md`](../../../CATALOG.md:24) → actualizado a `review` por `janitor`.

### 10 · MEDIO · `apps/README.md` no listaba `calc-calistenia` (corregido)

- **Evidencia**: [`apps/README.md`](../../README.md:13) → fila añadida por `janitor`.

### 11 · MEDIO · `issues.md` vacío pese a hallazgos (corregido)

- **Descripción**: este mismo registro, poblado por `janitor`.

### 12 · BAJO · Faltaba `SECURITY_REVIEW.md` (corregido)

- **Descripción**: creado en [`SECURITY_REVIEW.md`](SECURITY_REVIEW.md:1) por `janitor`.

### 13 · BAJO · `memory.md` no refleja el estado real de las revisiones

- **Evidencia**: [`memory.md`](memory.md:51) indica como pendiente `legal-reviewer`, ya realizado.
- **Corrección**: `implementer` actualiza `memory.md`.

### 14 · BAJO · CA-004 se expresa con una entrada inexistente ("1RM 90 kg")

- **Evidencia**: [`REQUIREMENTS.md`](REQUIREMENTS.md:59).
- **Corrección**: `spec-writer` reescribe CA-004 con las entradas reales (peso/lastre/reps).
