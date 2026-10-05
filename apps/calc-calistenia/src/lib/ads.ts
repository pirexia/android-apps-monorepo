import mobileAds, { AdsConsent } from 'react-native-google-mobile-ads';

/**
 * Inicializa el SDK de anuncios respetando el consentimiento UMP (INV-008).
 * `AdsConsent.gatherConsent` solicita la información de consentimiento y, si es
 * necesario, muestra el formulario de consentimiento antes de cargar anuncios.
 * Si no hay red o el consentimiento no aplica, todo falla en silencio (INV-003).
 */
export async function initializeAds(): Promise<void> {
  try {
    await AdsConsent.gatherConsent({
      tagForUnderAgeOfConsent: false,
    });
  } catch {
    // Sin red o consentimiento no aplicable: continuar sin anuncios personalizados.
  }

  try {
    await mobileAds().initialize();
  } catch {
    // El SDK de anuncios falla en silencio (INV-003).
  }
}
