import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

// INV-002: en desarrollo solo IDs de prueba. En producción, obtener el ID real
// desde la configuración de la app (p. ej. Constants.expoConfig?.extra?.adUnitBanner).
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

/**
 * Banner que falla en silencio cuando no hay red (INV-003).
 * La utilidad debe seguir funcionando aunque el anuncio no cargue.
 */
export function AdBanner() {
  return <BannerAd unitId={TEST_BANNER_ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />;
}
