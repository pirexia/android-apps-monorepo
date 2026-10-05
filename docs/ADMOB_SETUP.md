# Configuración de AdMob (monorrepo)

> Guía operativa y común a todas las apps. Recuerda: **en desarrollo solo IDs de prueba**
> (INV-002). Los IDs reales se inyectan por configuración de producción, nunca en el código.

## 0. Requisitos previos

- Cuenta de Google.
- Cuenta de Google Play (para publicar y para asociar la app a AdMob).
- El `android.package` definitivo de la app (p. ej. `com.calccalistenia.app`) en
  [`apps/<app-slug>/app.json`](../apps/_template/app.json:1).

## 1. Crear/abrir la cuenta de AdMob

1. Entra en <https://admob.google.com/> con tu cuenta de Google y acepta los términos.
2. Completa los datos de la cuenta:
   - **País/región** y **moneda de pago** (p. ej. España / EUR).
   - **Configuración > Datos de pago**: nombre/razón social, NIF y dirección fiscal. Necesario
     para cobrar; el pago se emite al superar el umbral (≈100 € / 100 $).
   - **Configuración > Datos fiscales**: formulario fiscal de EE. UU. (W-8BEN para personas
     físicas fuera de EE. UU.). Sin esto, AdMob puede retener impuestos.

## 2. Añadir la app a AdMob

1. **Aplicaciones > Añadir aplicación**.
2. Indica si ya está publicada en Google Play (Sí/No) y selecciona **Android**.
3. Si está publicada, búscala por su ficha; si no, créala manualmente con el `android.package`
   exacto.
4. AdMob genera el **ID de aplicación (App ID)** con el formato
   `ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY`. **Ese** es el que va en el plugin nativo.

## 3. Crear unidades de anuncio

En **Aplicaciones > (tu app) > Unidades de anuncio > Añadir unidad de anuncio**:

| Formato | Nombre sugerido | Uso en la app | Variable |
| --- | --- | --- | --- |
| Banner (adaptable anclado) | `banner-pie` | pie de pantalla | `bannerUnitId` |
| Intersticial | `interstitial-calculo` | tras N cálculos | `interstitialUnitId` |

Cada unidad genera un ID con el formato `ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ`.

## 4. Inyectar los IDs reales sin tocar el código (INV-002)

En producción, sobrescribe `expo.extra.admob` y el plugin en
[`apps/<app-slug>/app.json`](../apps/calc-calistenia/app.json:1):

```json
{
  "expo": {
    "plugins": [
      ["react-native-google-mobile-ads", {
        "androidSdk": "classic",
        "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~ANDROID_APP_ID",
        "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~IOS_APP_ID"
      }]
    ],
    "extra": {
      "admob": {
        "bannerUnitId": "ca-app-pub-XXXXXXXXXXXXXXXX/BANNER_UNIT_ID",
        "interstitialUnitId": "ca-app-pub-XXXXXXXXXXXXXXXX/INTERSTITIAL_UNIT_ID"
      }
    }
  }
}
```

- [`AdBanner.tsx`](../apps/calc-calistenia/src/components/AdBanner.tsx:8) lee
  `Constants.expoConfig?.extra?.admob?.bannerUnitId` y, si no existe, cae al **ID de prueba**.
- [`AdInterstitial.tsx`](../apps/calc-calistenia/src/components/AdInterstitial.tsx:1) hace lo
  mismo con `interstitialUnitId`.
- El **App ID** real va en el plugin (`androidAppId`/`iosAppId`), no en el código.
- Recomendado: mantener los IDs reales fuera del repositorio (variables de entorno de EAS o
  `app.config.js` con secretos), y dejar los de prueba como valor por defecto.

## 5. Consentimiento (RGPD / EEE / UK) — obligatorio antes de cargar anuncios

1. En AdMob: **Privacidad y mensajería > GDPR** → crea el mensaje y publícalo.
2. Si aplica a usuarios de EE. UU. (reglamentos estatales), publica también el mensaje
   correspondiente.
3. La app ya invoca `AdsConsent.gatherConsent(...)` **antes** de `mobileAds().initialize()` en
   [`ads.ts`](../apps/calc-calistenia/src/lib/ads.ts:9). No cargues anuncios antes del
   consentimiento.

## 6. Verificación y buenas prácticas

- **Nunca** hagas clic en tus propios anuncios reales: puede provocar el baneo de la cuenta.
- En desarrollo, usa los **IDs de prueba** (por defecto en el repo) o el modo de prueba del SDK.
- Comprueba en AdMob que aparecen **impresiones** y **solicitudes** tras unas horas.
- Verifica que la app funciona **en modo avión**: el anuncio debe fallar en silencio (INV-003).

## 7. Publicación

1. Asocia la app de AdMob con la ficha de Play Console (Aplicaciones > Verificar app).
2. (Opcional, si tienes web) publica `app-ads.txt` en el dominio para proteger tu inventario.
3. Revisa que la ficha de Play declara **"contiene anuncios"** y que el **Data Safety** es
   coherente con la política de privacidad (Checklist C de la skill `legal-compliance`).

## 8. Checklist

- [ ] Cuenta de AdMob creada, con datos fiscales y de pago.
- [ ] App añadida y asociada al `android.package` correcto.
- [ ] Unidades de anuncio creadas (banner adaptable anclado + intersticial).
- [ ] IDs reales en `app.json` (`plugins` + `extra.admob`), fuera del código fuente.
- [ ] Mensaje de consentimiento UMP (GDPR) publicado en AdMob.
- [ ] Prueba en dispositivo con IDs de prueba y verificación en modo avión.
