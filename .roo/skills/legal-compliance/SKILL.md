---
name: legal-compliance
description: >
  Garantiza que cada app del monorrepo cumple RGPD/LOPDGDD, LSSI-CE y las políticas de Google Play
  y AdMob. Redacta los textos legales y valida que no se recojan datos personales o sensibles.
  Úsalo antes de cerrar una app o al cambiar anuncios, permisos o flujos de datos.
---

# Legal Compliance (España / UE)

## Regla por defecto

Ninguna app del monorrepo recoge datos personales ni sensibles. Toda la información se guarda
localmente en el dispositivo (AsyncStorage) y no sale de él. Cualquier excepción debe
justificarse por escrito y documentarse antes de implementarse.

## Cuándo usarla

- Al abrir una app nueva (para dejar el esqueleto legal preparado).
- Antes de dar por cerrada una app.
- Cuando cambian permisos, SDKs de anuncios, públicos objetivo o cualquier flujo de datos.

## Salida

- `apps/<app-slug>/docs/LEGAL.md` con los textos legales y el checklist cumplimentado.
- Informe de hallazgos si algo no cumple.

## Checklist A — Código y configuración

1. `app.json` no añade permisos de Cámara, Contactos, Ubicación ni Micrófono salvo necesidad
   vital (INV-001, INV-006).
2. No hay `fetch`/`axios` ni envío de datos a servidores en la lógica de negocio (INV-005).
3. Persistencia solo AsyncStorage local (INV-003, INV-007).
4. Sin SDKs de analítica, telemetría o configuración remota.
5. IDs de AdMob de prueba en desarrollo (INV-002); los reales solo vía configuración de producción.
6. Pantalla de ajustes con enlace a la política de privacidad (INV-004).
7. No se pide ni almacena: nombre real, email, teléfono, ubicación, contactos, salud, etc.
8. Si la app muestra anuncios y se distribuye en EEE/UK: flujo de consentimiento Google UMP
   antes de cargar anuncios, o anuncios configurados como no personalizados de forma verificable.

## Checklist B — Textos legales obligatorios

Redacta en `apps/<app-slug>/docs/LEGAL.md`:

1. **Política de privacidad** (obligatoria: AdMob y Google Play la exigen). Debe incluir:
   - Responsable del tratamiento (identidad y contacto).
   - Declaración de no recogida de datos personales por la app, si aplica.
   - Tratamiento por terceros: Google AdMob puede tratar identificadores de publicidad,
     datos del dispositivo y ubicación aproximada para servir anuncios.
   - Enlaces a la política de privacidad de Google y a la configuración de anuncios.
   - Base jurídica del tratamiento (consentimiento para anuncios personalizados).
   - Derechos del usuario (acceso, rectificación, supresión, limitación, portabilidad, oposición)
     y derecho a reclamar ante la AEPD.
   - Conservación: datos locales en el dispositivo; se eliminan al desinstalar.
2. **Aviso legal** (LSSI-CE, recomendado si la app se ofrece en España): identidad del
   desarrollador (nombre o razón social, NIF, dirección o email de contacto).
3. **Términos de uso** (solo si la app tiene contenido generado por usuarios, compras,
   suscripciones o cuentas): licencia de uso, restricciones, responsabilidad y legislación aplicable.

## Checklist C — Google Play

1. Ficha de Data Safety coherente con la política de privacidad (declarar "no se recogen datos"
   o lo que realmente trate AdMob).
2. App marcada como "contiene anuncios" si usa AdMob.
3. No dirigida a menores de 13 años salvo cumplimiento del programa Families; por defecto,
   no dirigir a menores.
4. Sin permisos no declarados ni comportamientos engañosos.

## Plantilla mínima de política de privacidad

Pega y adapta esta estructura en `apps/<app-slug>/docs/LEGAL.md`:

### Política de privacidad de <Nombre de la App>

Última actualización: <fecha>

1. **Responsable**: <nombre o razón social>, <NIF>, <email de contacto>.
2. **Datos que tratamos**: esta aplicación no recoge ni almacena datos personales; los datos
   que introduzcas se guardan únicamente en tu dispositivo.
3. **Publicidad**: mostramos anuncios a través de Google AdMob, que puede tratar identificadores
   de publicidad y datos del dispositivo. Consulta la política de privacidad de Google y
   gestiona tus preferencias de anuncios desde los enlaces de Google.
4. **Base jurídica**: para anuncios personalizados se solicita tu consentimiento (Google UMP).
5. **Derechos**: puedes ejercer los derechos de acceso, rectificación, supresión, limitación,
   portabilidad y oposición escribiendo a <email>; también puedes reclamar ante la AEPD.
6. **Conservación**: los datos permanecen en tu dispositivo y se eliminan al desinstalar la app.

## Aviso importante

Esta skill es una guía operativa, no asesoramiento jurídico. Ante apps con tratamiento real de
datos personales, categorías especiales o públicos menores, la revisión debe validarse con un
profesional antes de publicar.
