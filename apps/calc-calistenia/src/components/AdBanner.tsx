import Constants from 'expo-constants';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

// INV-002: por defecto se usa el ID de banner de PRUEBA (desarrollo). En producción, define
// `expo.extra.admob.bannerUnitId` con el ID real sin tocar el código.
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

function bannerUnitId(): string {
  const configured = Constants.expoConfig?.extra?.admob?.bannerUnitId;
  return typeof configured === 'string' && configured.length > 0 ? configured : TEST_BANNER_ID;
}

/**
 * Banner que falla en silencio cuando no hay red (INV-003).
 * La utilidad debe seguir funcionando aunque el anuncio no cargue.
 */
export function AdBanner() {
  // LARGE_ANCHORED_ADAPTIVE_BANNER es el formato anclado más grande (más visible en el pie).
  return <BannerAd unitId={bannerUnitId()} size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER} />;
}
