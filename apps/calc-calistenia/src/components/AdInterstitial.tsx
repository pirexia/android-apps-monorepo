import Constants from 'expo-constants';
import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';

// INV-002: por defecto se usa el ID de intersticial de PRUEBA (desarrollo). En producción,
// define `expo.extra.admob.interstitialUnitId` con el ID real sin tocar el código.
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';

function interstitialUnitId(): string {
  const configured = Constants.expoConfig?.extra?.admob?.interstitialUnitId;
  return typeof configured === 'string' && configured.length > 0
    ? configured
    : TEST_INTERSTITIAL_ID;
}

let interstitial: InterstitialAd | null = null;

function getAd(): InterstitialAd {
  if (!interstitial) {
    interstitial = InterstitialAd.createForAdRequest(interstitialUnitId());
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      interstitial?.load();
    });
    interstitial.load();
  }
  return interstitial;
}

/**
 * Muestra un intersticial si está cargado; si no, lo recarga para el siguiente intento.
 * El consentimiento (personalizado/no personalizado) lo gestiona Google UMP antes de
 * inicializar el SDK (INV-008). Falla en silencio sin red (INV-003).
 */
export function showInterstitial(): void {
  const ad = getAd();
  if (!ad.loaded) {
    ad.load();
    return;
  }
  try {
    void ad.show();
  } catch {
    // Sin red o no disponible: falla en silencio.
  }
}
