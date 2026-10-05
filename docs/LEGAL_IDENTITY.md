# Identidad legal común (monorrepo)

> **Fuente única de verdad** para los datos legales compartidos por todas las apps del monorrepo.
> Cada app **copia** estos valores (regla del repo: duplicar de forma controlada antes que
> acoplar) en su [`docs/LEGAL.md`](../apps/_template/docs/LEGAL.md:1) y en su pantalla de
> privacidad in-app [`privacy.tsx`](../apps/calc-calistenia/app/privacy.tsx:1) (INV-004).

## 1. Titular / responsable del tratamiento

| Campo | Valor |
| --- | --- |
| Nombre comercial / marca (visible en la política) | `<PENDIENTE: nombre comercial>` |
| Correo de contacto dedicado (visible) | `<PENDIENTE: email>` |
| NIF / CIF | **No se publica** (privado; solo si un canal lo exige) |
| Nombre/razón social legal del titular | **Privado** (no se publica) |
| Domicilio | **No se publica** (dirección de negocio solo si un canal la exige) |

> **Decisión adoptada**: la política pública identifica al responsable con **marca + email
> dedicado**, sin publicar nombre real, NIF ni domicilio (ver §5). RGPD exige que el responsable
> sea identificable; si un canal (Play/LSSI-CE) exige la identidad legal completa, se facilita por
> el cauce correspondiente, no en la app.

## 2. Publicación de la política de privacidad

| Campo | Valor |
| --- | --- |
| URL pública de la política | `<PENDIENTE: https://...>` |
| Última actualización de los textos | `<PENDIENTE: YYYY-MM-DD>` |

> La URL se inyecta por configuración (no en el código) en `expo.extra.privacyPolicyUrl` de
> [`app.json`](../apps/calc-calistenia/app.json:35). La app funciona con la política in-app
> aunque la URL esté vacía.

## 3. AdMob (publicador común)

| Campo | Valor |
| --- | --- |
| Publisher ID | `<PENDIENTE: ca-app-pub-XXXXXXXXXXXXXXXX>` |
| App ID Android | `<PENDIENTE>` |
| App ID iOS | `<PENDIENTE>` |

> Ver [`docs/ADMOB_SETUP.md`](ADMOB_SETUP.md:1) para crear la cuenta y obtener estos IDs.

## 4. Cómo aplicar los valores a una app

1. Rellena **este** documento con los valores reales.
2. En `apps/<app-slug>/docs/LEGAL.md`, sustituye `«<NOMBRE COMERCIAL>»` y
   `<EMAIL DE CONTACTO>` por la marca y el email reales, y actualiza la fecha.
3. En `apps/<app-slug>/app/privacy.tsx`, sustituye las constantes `CONTACT` y la línea del
   responsable por los mismos valores.
4. Si hay URL pública, fíjala en `expo.extra.privacyPolicyUrl`.
5. Registra el cambio en `docs/memory.md` de la app.

## 5. Visibilidad del responsable (quién ve estos datos)

- **RGPD**: la política debe identificar al responsable del tratamiento. Si eres **autónomo o
  particular**, el responsable puede ser tu **nombre y apellidos**; una "razón social" es la
  denominación de una **sociedad**.
- **La política de privacidad es pública**: aparece en la ficha de Google Play, en la pantalla
  in-app (INV-004) y en la URL pública. Todo lo que pongas ahí lo puede ver cualquiera.
- **AdMob**: tus datos fiscales y de pago (nombre, NIF, dirección) son **privados**, solo los ve
  Google. No se muestran a los usuarios.
- **Google Play**: muestra el **nombre de desarrollador** (puede ser una marca comercial) y, en
  cuentas nuevas, una **dirección verificada**. El email de contacto también es público.

### Opciones para reducir tu exposición (de mayor a menor privacidad)

1. **Sociedad (SL)**: el responsable es la persona jurídica; solo se publican su razón social y
   CIF, no tu nombre.
2. **Marca / nombre comercial + email dedicado**: publicado como responsable el nombre comercial
   (p. ej. "MiApps Studio") y un email profesional (no personal); el NIF solo si el canal
   (LSSI-CE / Play) lo exige.
3. **Nombre real como autónomo**: lo más transparente, pero expone tu nombre (y NIF en el aviso
   legal LSSI-CE).

> **No inventes** un nombre o NIF que no exista: puede provocar el cierre de las cuentas de
> AdMob/Play y responsabilidad legal. RGPD y LSSI-CE marcan mínimos de identificación; la
> recomendación práctica es usar marca + email dedicado y **no publicar NIF/domicilio** salvo lo
> estrictamente exigido por el canal.

## 6. Uso y registro de la marca (nombre comercial)

**¿Hace falta registrar la marca para usarla?** No. Puedes usar una marca o nombre comercial
("marca de uso") para identificar la app, la ficha de Play y la política de privacidad **sin
registrarla**. El registro **no es obligatorio**; sirve para tener **derecho exclusivo** y poder
impedir que otros la usen.

**Dónde se registra**

- **Marca nacional (España)**: [OEPM](https://www.oepm.es) — solicitud electrónica, ~150 € por
  1 clase (con descuento por vía online); protección 10 años renovables.
- **Marca de la UE (EUTM)**: [EUIPO](https://euipo.europa.eu) — cubre los 27 países; desde
  ~850 € online por 1 clase.
- **Nombre comercial**: también se puede registrar en la OEPM (identifica la empresa/negocio).

**Procedimiento paso a paso (marca nacional, OEPM)**

1. Define el **signo** (denominativo = solo texto, gráfico o mixto) y las **clases de Niza**.
2. Búsqueda de disponibilidad (OEPM / EUIPO / TMview).
3. Presenta la solicitud **online** en la sede electrónica de la OEPM (requiere **Certificado
   digital** o **Cl@ve**) y paga la **tasa**.
4. Examen de forma y de prohibiciones absolutas → publicación en el **BOPI**.
5. Plazo de **oposición** de terceros: 2 meses.
6. Resolución favorable → **concesión** y certificado. Duración **10 años**, renovable.

**Coste y plazos orientativos** (verifica las tasas vigentes en la OEPM/EUIPO)

- **OEPM**: tasa ≈ 150 € la 1.ª clase + ≈ 92 € por cada clase adicional (vía online); resolución
  habitual en ~6-8 meses.
- **EUIPO**: 850 € la 1.ª clase + 50 € la 2.ª + 150 € cada una de las siguientes; protege en
  toda la UE.
- **Agente de la propiedad industrial (opcional)**: honorarios aparte (típicamente 300-600 €).

> **Privacidad**: el registro de marcas es **público**. Si registras como **persona física**, tu
> nombre aparecerá en el registro de la OEPM/EUIPO. Para mantener tu nombre privado, registra la
> marca a nombre de una **sociedad**, o usa una **marca de uso sin registrar** (gratis, pero sin
> derecho exclusivo).

**Clases recomendadas para apps**: *clase 9* (software/aplicaciones) y *clase 42* (servicios de
software/SaaS). Añade otras (p. ej. 35) solo si haces publicidad o marketplace.

**Antes de usar el nombre**

1. Comprueba que no esté ya registrado: buscador de la OEPM, [eSearch plus de la
   EUIPO](https://euipo.europa.eu/eSearch/) y [TMview](https://www.tmdn.org/tmview/).
2. Si está libre, registra el **dominio** y reserva el nombre en Play/App Store.
3. Evita nombres muy parecidos a marcas conocidas (riesgo de infracción).

**En Google Play y AdMob**

- En Play, el **nombre de desarrollador** puede ser tu marca; Google verifica tu identidad
  **en privado**.
- En AdMob, el nombre de cuenta puede ser la marca, pero el **perfil de pago debe corresponder a
  una persona o entidad real** (es quien cobra y tributa).

**Si vas a monetizar** (AdMob): necesitarás una vía para facturar y tributar (alta como
**autónomo** o constituir una **sociedad** ante Hacienda). La marca es la cara pública; la
identidad fiscal es privada.

> No es asesoramiento jurídico. Para registrar una marca conviene apoyarse en un **agente de la
> propiedad industrial** (CPI) colegiado.
