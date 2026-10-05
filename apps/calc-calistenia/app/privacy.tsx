import { ScrollView, StyleSheet, Text } from 'react-native';

import { useTheme } from '../src/theme/colors';
import { spacing, typography } from '../src/theme/tokens';

const LAST_UPDATED = '2026-10-04';
const BRAND_NAME = '<NOMBRE COMERCIAL>';
const CONTACT = '<EMAIL DE CONTACTO>';

/**
 * Política de privacidad dentro de la app (INV-004). Mismo contenido que
 * [`LEGAL.md`](../docs/LEGAL.md:1); se puede publicar además en una URL para la ficha
 * de Play Store (ver `expo.extra.privacyPolicyUrl`).
 */
export default function PrivacyScreen() {
  const colors = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>Política de privacidad</Text>
      <Text style={[styles.updated, { color: colors.textSecondary }]}>
        Última actualización: {LAST_UPDATED}
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>1. Responsable</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        «{BRAND_NAME}» (nombre comercial). Correo de contacto: {CONTACT}. No publicamos datos
        identificativos adicionales del titular.
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>2. Datos que tratamos</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        Esta aplicación no recoge ni almacena datos personales. Los valores que introduces
        (peso corporal, lastre y repeticiones) se calculan y se guardan únicamente en tu
        dispositivo; no se envían a ningún servidor. La preferencia de unidad (kg o lb) también
        se guarda localmente. Al desinstalar la app se elimina cualquier dato local.
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>3. Publicidad</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        Mostramos anuncios con Google AdMob, que puede tratar identificadores de publicidad y
        datos del dispositivo. Consulta la política de privacidad de Google y gestiona tus
        preferencias de anuncios desde los ajustes de Google.
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>4. Base jurídica</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        Para los anuncios personalizados se solicita tu consentimiento mediante el formulario de
        Google (UMP) antes de cargar anuncios, conforme al RGPD.
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>5. Derechos</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad
        y oposición escribiendo a {CONTACT}. También puedes reclamar ante la Agencia Española de
        Protección de Datos (www.aepd.es).
      </Text>

      <Text style={[styles.heading, { color: colors.text }]}>6. Conservación</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
        Los datos permanecen únicamente en tu dispositivo y se eliminan al desinstalar la app.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.xxl, gap: spacing.sm, paddingBottom: spacing.xxxl },
  title: { ...typography.title },
  updated: { ...typography.caption, marginBottom: spacing.sm },
  heading: { ...typography.heading, marginTop: spacing.sm },
  paragraph: { ...typography.body },
});
