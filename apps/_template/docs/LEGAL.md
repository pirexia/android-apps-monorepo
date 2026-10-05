# Textos legales — <Nombre de la App>

> Plantilla de cumplimiento legal (INV-008). Rellena y valida con la skill `legal-compliance`.

## 1. Política de privacidad

Última actualización: <fecha>

**Responsable del tratamiento**

- Marca / nombre comercial: <nombre comercial>
- Contacto: <email dedicado>
- No publicar nombre real, NIF ni domicilio salvo que un canal (Play/LSSI-CE) lo exija.

**Datos que tratamos**

Esta aplicación no recoge ni almacena datos personales en servidores. Los datos que
introduzcas se guardan únicamente en tu dispositivo y se eliminan al desinstalar la app.

**Publicidad**

Mostramos anuncios mediante Google AdMob, que puede tratar identificadores de publicidad y
datos del dispositivo para servir anuncios. Consulta la política de privacidad de Google y
gestiona tus preferencias de anuncios desde la configuración de Google.

**Base jurídica**

Para anuncios personalizados en el Espacio Económico Europeo y Reino Unido solicitamos tu
consentimiento mediante el flujo de consentimiento de Google (UMP).

**Derechos**

Puedes ejercer los derechos de acceso, rectificación, supresión, limitación, portabilidad y
oposición escribiendo a <email>. También puedes presentar una reclamación ante la Agencia
Española de Protección de Datos (AEPD).

**Conservación**

Los datos permanecen en tu dispositivo y se eliminan al desinstalar la aplicación.

## 2. Aviso legal (LSSI-CE)

- Titular: <nombre comercial> (marca)
- Contacto: <email dedicado>

## 3. Términos de uso (solo si aplica)

<Redactar solo si la app tiene cuentas, compras, suscripciones o contenido de usuario.>

## Checklist de cumplimiento

- [ ] Sin permisos innecesarios en `app.json`.
- [ ] Sin `fetch`/`axios` ni telemetría en la lógica de negocio.
- [ ] Persistencia solo AsyncStorage.
- [ ] IDs de AdMob de prueba en desarrollo.
- [ ] Consentimiento UMP configurado si se sirven anuncios en EEE/UK.
- [ ] Data Safety de Google Play coherente con esta política.
