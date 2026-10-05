import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';

// INV-002: ID de intersticial de prueba. En producción, desde configuración externa.
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';

let interstitial: InterstitialAd | null = null;

function getAd(): InterstitialAd {
  if (!interstitial) {
    interstitial = InterstitialAd.createForAdRequest(TEST_INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      interstitial?.load();
    });
    interstitial.load();
  }
  return interstitial;
}

/**
 * Muestra un intersticial si está cargado; si no, lo recarga para el siguiente
 * intento. Falla en silencio sin red (INV-003).
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
