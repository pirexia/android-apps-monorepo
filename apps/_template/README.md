# Plantilla canónica de app

Esta carpeta es la plantilla base para crear nuevas micro-apps del monorrepo.
No se publica ni se monetiza.

## Cómo instanciar una app nueva

```bash
# 1. Scaffold Expo en apps/<slug>
npx create-expo-app@latest apps/<slug> --template default

# 2. Copiar estructura desde la plantilla
cp -R apps/_template/app apps/<slug>/app
cp -R apps/_template/src apps/<slug>/src
cp -R apps/_template/docs apps/<slug>/docs
cp apps/_template/app.json apps/<slug>/app.json
cp apps/_template/tsconfig.json apps/<slug>/tsconfig.json

# 3. Instalar dependencias compatibles con la versión de Expo
cd apps/<slug>
npx expo install expo-router react-native-safe-area-context react-native-screens \
  expo-linking expo-constants expo-status-bar \
  @react-native-async-storage/async-storage react-native-google-mobile-ads \
  react-native-paper @expo/vector-icons
```

## Después del scaffold

1. Actualiza [`app.json`](app.json): `name`, `slug`, `scheme` y `android.package`.
2. Mantén los IDs de AdMob de **prueba** (INV-002).
3. Rellena [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md),
   [`docs/PLAN.md`](docs/PLAN.md) y [`docs/memory.md`](docs/memory.md).
4. Reemplaza la URL de la política de privacidad en
   [`app/settings.tsx`](app/settings.tsx).
5. Genera iconos y splash screen (`npx expo prebuild` o EAS).

## Estructura

```text
_app/
├── app/
│   ├── _layout.tsx   # Stack raíz + tema
│   ├── index.tsx     # utilidad principal
│   └── settings.tsx  # ajustes + política de privacidad (INV-004)
├── src/
│   ├── components/   # AdBanner y componentes
│   │   └── ui/       # sistema de diseño: Button, Card, Field, ScreenHeader, SegmentedControl
│   ├── lib/          # storage (AsyncStorage)
│   └── theme/        # paleta Dark/Light + puente Paper (paperTheme.ts)
├── docs/             # REQUIREMENTS, PLAN, memory
├── app.json
├── tsconfig.json
└── package.json      # generado por create-expo-app
```
