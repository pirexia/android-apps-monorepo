# Requisitos — Calculadora de Calistenia (`calc-calistenia`)

> Especificación funcional previa a la implementación. Fuente de la idea:
> [`CATALOG.md`](../../../CATALOG.md:24), fila #1. Alcance confirmado: **1RM estimado
> (Epley) + volumen + lastre equivalente**.

## 1. Visión

`calc-calistenia` resuelve el problema de un practicante de calistenia que entrena con
peso corporal (y, opcionalmente, lastre) y quiere saber cuánta fuerza tiene de verdad y
qué lastre usar para una progresión concreta. Dado el **peso corporal**, el **lastre
añadido** y las **repeticiones realizadas**, la app estima el **1RM (fórmula de Epley)**,
el **volumen de la serie** (carga × repeticiones) y el **lastre equivalente** para un
número de repeticiones objetivo distinto.

Es 100% offline: todo el cálculo es aritmética local pura, sin red, sin cuentas y sin
datos personales. Se monetiza con banner + intersticial (tras varios cálculos), con
consentimiento UMP en EEE/UK según [`INV-008`](../../../.clinerules).

## 2. Usuarios objetivo

- Practicantes de calistenia y street workout que entrenan dominadas, fondos, flexiones o
  sentadillas con o sin lastre.
- Uso en el parque, en casa o en el gimnasio, a menudo **sin conexión**.
- Uso rápido: introducir 3 números, pulsar "Calcular" y leer el resultado.

## 3. Historias de usuario

- [ ] HU-001: Como practicante de calistenia, quiero introducir peso corporal, lastre
      añadido y repeticiones para conocer mi 1RM estimado, y así medir mi fuerza.
- [ ] HU-002: Como practicante, quiero ver el lastre equivalente para otro número de
      repeticiones objetivo, para planificar mi progresión.
- [ ] HU-003: Como practicante, quiero cambiar entre kilogramos y libras y que la app
      recuerde mi preferencia, para usar mis unidades habituales.
- [ ] HU-004: Como practicante, quiero calcular sin conexión y que la app no falle si no
      hay red, para usarla en cualquier sitio.
- [ ] HU-005: Como practicante, quiero que la app recuerde mi último cálculo para
      recuperarlo al reabrir la app sin tener que volver a teclearlo.

## 4. Criterios de aceptación (Dado / Cuando / Entonces)

Definiciones (unidad-agnósticas: se calcula en la unidad seleccionada, kg o lb):

- `Carga = peso corporal + lastre añadido`
- `1RM = Carga × (1 + repeticiones / 30)` si `repeticiones ≥ 2`; si `repeticiones = 1`,
  entonces `1RM = Carga` (no se aplica Epley).
- `Volumen = Carga × repeticiones`
- `Carga equivalente = 1RM / (1 + repeticiones objetivo / 30)` si `repeticiones objetivo ≥ 2`;
  si `repeticiones objetivo = 1`, `Carga equivalente = 1RM`.
- `Lastre equivalente = máx(0, Carga equivalente − peso corporal)`
- Redondeo de resultados a **1 decimal** (ver Q-1).

- [ ] CA-001 (1RM con Epley): **Dado** peso corporal 80.0 kg, lastre 0.0 kg y 10
      repeticiones, **cuando** pulso "Calcular", **entonces** veo `1RM = 106.7 kg`
      (80 × (1 + 10/30) = 106.666… → 106.7) y `Volumen = 800.0 kg` (80 × 10).
- [ ] CA-002 (1RM sin Epley): **Dado** peso corporal 80.0 kg, lastre 0.0 kg y 1
      repetición, **cuando** calculo, **entonces** `1RM = 80.0 kg` (no se aplica Epley).
- [ ] CA-003 (lastre equivalente): **Dado** los datos del CA-001 y repeticiones objetivo
      5, **cuando** calculo, **entonces** `Carga equivalente = 91.4 kg` y
      `Lastre equivalente = 11.4 kg` (106.666… / (1 + 5/30) = 91.428… − 80 = 11.428…).
- [ ] CA-004 (lastre equivalente acotado a 0): **Dado** peso corporal 80.0 kg, lastre 0.0 kg
      y 1 repetición (1RM = carga = 80.0 kg) con repeticiones objetivo 10, **cuando** calculo,
      **entonces** `Lastre equivalente = 0.0 kg` y se indica "sin lastre adicional"
      (carga equivalente = 80 / (1 + 10/30) = 60.0 < 80).
- [ ] CA-005 (unidades en libras): **Dado** que selecciono libras e introduzco 176.4 lb,
      0.0 lb y 10 repeticiones, **cuando** calculo, **entonces** `1RM = 235.2 lb`
      (176.4 × (1 + 10/30) = 235.2) y `Volumen = 1764.0 lb`.
- [ ] CA-006 (persistencia de unidad): **Dado** que selecciono libras y cierro la app,
      **cuando** la reabro, **entonces** la unidad sigue siendo libras (AsyncStorage).
- [ ] CA-007 (modo avión): **Dado** el dispositivo sin conexión, **cuando** calculo,
      **entonces** los resultados se muestran igual y no hay error ni bloqueo; los
      anuncios fallan en silencio.
- [ ] CA-008 (validación de entrada): **Dado** peso corporal ≤ 0, o lastre < 0, o
      repeticiones < 1, o repeticiones objetivo < 1, o un campo vacío, **cuando** pulso
      "Calcular", **entonces** se muestra un mensaje de validación y no se muestra ningún
      resultado incorrecto ni se produce un fallo.
- [ ] CA-009 (intersticial con límite de frecuencia): **Dado** que completo un cálculo
      válido, **cuando** se alcanza el umbral de frecuencia definido (por defecto: cada
      3 cálculos válidos y máximo 1 intersticial por minuto, ver Q-2), **entonces** se
      muestra un intersticial sin bloquear los resultados ya mostrados.
- [ ] CA-010 (persistencia del último cálculo): **Dado** que introduzco 80, 0, 10 y 5 y
      pulso "Calcular", **cuando** cierro y reabro la app, **entonces** los cuatro campos
      aparecen rellenos (80, 0, 10, 5) y se muestra el último resultado (1RM 106.7 kg,
      volumen 800.0 kg, carga equivalente 91.4 kg y lastre equivalente 11.4 kg).

## 5. Invariantes aplicables (INV-001 … INV-007)

- [ ] INV-001: sin permisos de Cámara/Contactos/Ubicación/Micrófono (no son vitales para
      esta utilidad).
- [ ] INV-002: IDs de AdMob de prueba en desarrollo.
- [ ] INV-003: funcionalidad completa en modo avión.
- [ ] INV-004: pantalla de ajustes con enlace a la política de privacidad.
- [ ] INV-005: sin `fetch`/`axios` ni servicios HTTP en la lógica de negocio.
- [ ] INV-006: sin permisos extra en `app.json` salvo los estrictamente requeridos.
- [ ] INV-007: la unidad seleccionada y el último cálculo se persisten en AsyncStorage y
      sobreviven al reinicio; una pérdida de red no produce fallos no controlados.

## 6. Fuera de alcance

- Sin cuentas de usuario, sincronización en la nube ni red en la lógica de negocio.
- Sin analítica, telemetría ni configuración remota.
- Sin historial múltiple de cálculos: solo se conserva localmente el último cálculo (ver
  Q-3); sin exportación ni compartir resultados.
- Sin contenido de ejercicios, vídeos ni planes de entrenamiento.
- Sin recogida de datos personales o sensibles.

## 7. Preguntas abiertas

- Q-1: Redondeo de resultados, ¿a 1 decimal (por defecto) o a 2 decimales?
- Q-2: Cadencia del intersticial: ¿cada 3 cálculos válidos con máximo 1 por minuto
      (por defecto), o tras cada cálculo?
- Q-3: Resuelto: se guarda el último cálculo (entradas + resultado) localmente para
      recuperarlo al abrir la app; no hay historial múltiple.
- Q-4: ¿Se limita el número de repeticiones y repeticiones objetivo a un máximo
      (por defecto: sin límite superior, acepta enteros ≥ 1)?

## 8. Aprobación

Esta especificación **debe ser aprobada** antes de pasar a implementación. Tras la
aprobación, el `architect` redactará [`apps/calc-calistenia/docs/PLAN.md`](../PLAN.md)
y el `implementer` podrá construir la app a partir de ambos documentos.
