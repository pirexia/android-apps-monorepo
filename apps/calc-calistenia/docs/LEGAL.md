# LEGAL — Calculadora de Calistenia (`calc-calistenia`)

> Documento de cumplimiento legal (skill `legal-compliance`).
> Revisión: 2026-10-04 · Agente: `legal-reviewer`.

## Checklist A — Código y configuración

| # | Punto | Resultado | Evidencia |
| --- | --- | --- | --- |
| 1 | `app.json` sin permisos de Cámara/Contactos/Ubicación/Micrófono (INV-001, INV-006) | ✅ Sin permisos declarados | [`app.json`](../app.json:1) |
| 2 | Sin `fetch`/`axios` ni envío a servidores (INV-005) | ✅ Verificado en `app/` y `src/` | búsqueda en revisión de seguridad |
| 3 | Persistencia solo AsyncStorage (INV-003, INV-007) | ✅ Solo [`storage.ts`](../src/lib/storage.ts:1) | — |
| 4 | Sin SDKs de analítica/telemetría/configuración remota | ✅ Dependencias limpias | [`package.json`](../package.json:6) |
| 5 | IDs de AdMob de prueba en desarrollo (INV-002) | ✅ Solo publisher de prueba `3940256099942544` | [`AdBanner.tsx`](../src/components/AdBanner.tsx:5), [`AdInterstitial.tsx`](../src/components/AdInterstitial.tsx:4) |
| 6 | Pantalla de ajustes con enlace a política (INV-004) | ⚠️ Enlace presente; URL pendiente | [`settings.tsx`](../app/settings.tsx:7) |
| 7 | No se pide/almacena nombre, email, teléfono, ubicación, contactos, salud, etc. | ✅ No se recogen; solo se persisten localmente la unidad y el último cálculo | [`index.tsx`](../app/index.tsx), [`storage.ts`](../src/lib/storage.ts:1) |
| 8 | Consentimiento UMP antes de anuncios en EEE/UK (INV-008) | ✅ `AdsConsent.gatherConsent` antes de `mobileAds().initialize()` | [`ads.ts`](../src/lib/ads.ts:1) |

**Declaración clave**: la app **no recoge datos personales ni sensibles**. Los valores que el
usuario introduce (peso corporal, lastre, repeticiones) se procesan y se guardan **únicamente
en el dispositivo** (AsyncStorage), sin transmitirse a ningún servidor; lo mismo aplica a la
preferencia de unidad (`kg`/`lb`). Ninguno de estos datos sale del dispositivo ni es tratado
por el responsable.

## Checklist B — Textos legales

### Política de privacidad de Calculadora de Calistenia

Última actualización: 2026-10-04

1. **Responsable del tratamiento**: «<NOMBRE COMERCIAL>» (nombre comercial), con correo de
   contacto <EMAIL DE CONTACTO>. Por decisión del titular no se publican nombre real, NIF ni
   domicilio; se facilitan a la autoridad competente cuando proceda.

2. **Datos que tratamos**: esta aplicación **no recoge ni almacena datos personales**. Los
   valores que introduces (peso corporal, lastre añadido, repeticiones y repeticiones
   objetivo) se calculan y se guardan **únicamente en tu dispositivo** (almacenamiento
   local); no se envían a ningún servidor ni son accesibles para el responsable. También se
   conserva localmente tu preferencia de unidad (kg o lb). Al desinstalar la aplicación se
   elimina cualquier dato local.

3. **Publicidad**: mostramos anuncios a través de Google AdMob. Google puede tratar
   identificadores de publicidad y datos del dispositivo para servir anuncios. Consulta la
   [política de privacidad de Google](https://policies.google.com/privacy) y gestiona tus
   preferencias en [Configuración de anuncios de Google](https://adssettings.google.com).

4. **Base jurídica**: para los anuncios personalizados se solicita tu consentimiento mediante
   el formulario de consentimiento de Google (UMP) antes de cargar los anuncios, conforme al
   RGPD. Puedes retirar tu consentimiento en cualquier momento.

5. **Derechos**: puedes ejercer los derechos de acceso, rectificación, supresión, limitación,
   portabilidad y oposición escribiendo a [EMAIL DE CONTACTO]. También puedes presentar una
   reclamación ante la Agencia Española de Protección de Datos ([www.aepd.es](https://www.aepd.es)).

6. **Conservación**: los datos permanecen únicamente en tu dispositivo y se eliminan al
   desinstalar la aplicación.

### Aviso legal (LSSI-CE)

- **Titular**: «<NOMBRE COMERCIAL>» (nombre comercial), contacto <EMAIL DE CONTACTO>.
- **Finalidad**: utilidad de cálculo orientativo para entrenamiento de calistenia. Los
  resultados son estimaciones informativas y **no constituyen asesoramiento médico,
  nutricional ni deportivo profesional**; ante cualquier duda de salud, consulta a un
  profesional cualificado.
- **Uso**: se permite el uso personal de la aplicación; no está permitida la ingeniería
  inversa ni la redistribución no autorizada.
- **Legislación aplicable**: legislación española; para consumidores en la UE, se aplicarán
  las disposiciones imperativas de su Estado miembro.

### Términos de uso

**No aplican**: la app no tiene cuentas de usuario, compras, suscripciones ni contenido
generado por usuarios.

## Checklist C — Google Play

| # | Punto | Resultado |
| --- | --- | --- |
| 1 | Ficha de Data Safety coherente | Declarar que la app **no recoge datos**; AdMob (tercero) puede tratar identificadores de publicidad |
| 2 | App marcada como "contiene anuncios" | Sí (AdMob) |
| 3 | No dirigida a menores de 13 | Público general; no se dirige a menores (sin programa Families) |
| 4 | Sin permisos no declarados ni comportamientos engañosos | ✅ |

## Hallazgos

| ID | Severidad | Título | Estado | Resolución |
| --- | --------- | ------ | ------ | ---------- |
| 1 | MEDIO | Política de privacidad con placeholders pendientes (identidad y URL) | abierto | Completar `[NOMBRE O RAZÓN SOCIAL]`, `[NIF]`, `[EMAIL DE CONTACTO]` y publicar esta política en una URL pública; después fijar `[URL PRIVACIDAD]` en [`app/settings.tsx`](../app/settings.tsx:7) vía `implementer` |

## Aviso

Esta skill es una guía operativa, no asesoramiento jurídico. Ante tratamiento real de datos
personales, categorías especiales o público menor, validar con un profesional antes de
publicar.
