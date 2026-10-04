# Arquitectura del Monorrepo — Android Apps (Expo)

> Versión 1.1 · Autor: System Architect · Estado: propuesta aplicada

Este documento define la estructura de carpetas, la navegación con Expo Router y el
cumplimiento de **Cero Backend** y **Offline First** para el monorrepo
`android-apps-monorepo`.

## 1. Principios de diseño

1. **Una app = una carpeta autocontenida** en `apps/<slug>`.
2. **Cero Backend**: la lógica de negocio no puede usar `fetch`, `axios` ni servicios HTTP.
3. **Offline First**: toda utilidad funciona sin conexión; los anuncios fallan en silencio.
4. **Docs vivas por app**: `REQUIREMENTS.md`, `PLAN.md` y `memory.md` en `apps/<slug>/docs/`.
5. **Monetización sin comprometer privacidad**: AdMob con IDs de prueba en desarrollo.

## 2. Cambios propuestos a `.clinerules` y `.roomodes`

Cambios aplicados:

- **`.clinerules`**
  - Corregida la errata `relo` y reorganizado el documento (versión `2.0.0`).
  - Añadidos los **App ID de AdMob de prueba** (Android e iOS) a `INV-002`.
  - Nuevos invariantes `INV-005` (sin red en lógica de negocio), `INV-006` (sin permisos
    innecesarios) e `INV-007` (determinismo offline).
  - Movida la documentación por app a `apps/<app>/docs/` con `REQUIREMENTS.md`,
    `PLAN.md` y `memory.md`.
  - Añadida la **Definición de Hecho (DoD)** y el gate de cierre multi-agente.
- **`.roomodes`**
  - Añadido `customInstructions` a cada modo para fijar su alcance y los archivos que debe
    tocar (`architect`, `spec-writer`, `implementer`, `test-writer`, `security-reviewer`,
    `doc-reviewer`).
  - `security-reviewer` ahora genera un informe en `apps/<app>/docs/SECURITY_REVIEW.md`.

## 3. Estructura de carpetas

```text
android-apps-monorepo/
├── .clinerules                    # Reglas globales (Cero Backend + Offline First)
├── .roomodes                      # Modos de agente (Roo Code / Cline)
├── .mcp.json                      # Servidores MCP del proyecto
├── README.md                      # Visión general del monorrepo
├── docs/
│   └── ARCHITECTURE.md            # Este documento
├── apps/
│   ├── README.md                  # Catálogo y estado de cada app
│   ├── _template/                 # Plantilla canónica (no se publica)
│   │   ├── app/                   # Expo Router (rutas)
│   │   │   ├── _layout.tsx        # Stack raíz con tema Dark/Light
│   │   │   ├── index.tsx          # Pantalla principal de la utilidad
│   │   │   └── settings.tsx       # Ajustes + política de privacidad (INV-004)
│   │   ├── src/
│   │   │   ├── components/        # AdBanner, componentes reutilizables
│   │   │   ├── lib/               # storage (AsyncStorage), helpers puros
│   │   │   └── theme/             # paleta adaptativa Dark/Light
│   │   ├── docs/
│   │   │   ├── REQUIREMENTS.md
│   │   │   ├── PLAN.md
│   │   │   └── memory.md
│   │   ├── app.json               # slug, scheme, plugins (sin permisos extra)
│   │   ├── tsconfig.json          # extiende expo/tsconfig.base + strict
│   │   ├── package.json           # generado con create-expo-app
│   │   └── README.md              # cómo instanciar la plantilla
│   └── <app-slug>/                # ej. tip-split, calc-ev
│       └── (misma estructura que _template)
└── packages/                      # OPCIONAL: solo si el código compartido se justifica
    ├── theme/
    └── eslint-config/
```

Regla práctica: **duplicar de forma controlada antes que acoplar apps**. `packages/`
solo se usa para theme/config/eslint compartidos y únicamente si reduce mantenimiento.

## 4. Navegación con Expo Router

La navegación es por sistema de archivos. Toda app tiene al menos estas rutas:

| Ruta            | Archivo                    | Propósito                                |
| --------------- | -------------------------- | ---------------------------------------- |
| `/`             | [`app/index.tsx`](../apps/_template/app/index.tsx:1) | Utilidad principal                       |
| `/settings`     | [`app/settings.tsx`](../apps/_template/app/settings.tsx:1) | Ajustes + política de privacidad (INV-004) |

Patrón de layout raíz (Stack con tema adaptativo):

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useTheme } from '../src/theme/colors';

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = useTheme();

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
      </Stack>
    </>
  );
}
```

Reglas de navegación:

- `app/index.tsx` es la pantalla principal de la utilidad.
- `app/settings.tsx` es obligatoria (INV-004).
- Rutas adicionales opcionales: `app/detail/[id].tsx`, `app/about.tsx`, etc.
- No usar librerías de navegación externas; Expo Router lo cubre todo.

## 5. Cero Backend y Offline First

Cumplimiento estructural:

1. **Persistencia** — solo [`src/lib/storage.ts`](../apps/_template/src/lib/storage.ts:1)
   (wrapper de `@react-native-async-storage/async-storage`). Prohibido `fetch`/`axios` en
   lógica de negocio (INV-005).
2. **Anuncios** — [`src/components/AdBanner.tsx`](../apps/_template/src/components/AdBanner.tsx:1)
   usa IDs de prueba (INV-002) y el SDK de anuncios falla en silencio si no hay red (INV-003).
3. **Tema** — [`src/theme/colors.ts`](../apps/_template/src/theme/colors.ts:1) paleta
   Dark/Light vía `useColorScheme`, sin dependencias de red.
4. **Permisos** — `app.json` no añade permisos extra; solo los que el SDK de anuncios o la
   utilidad exigen (INV-006).
5. **Robustez** — cada operación de storage envuelve errores en `try/catch` y devuelve un
   resultado seguro (INV-007).

Wrapper de storage recomendado:

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function load<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function save<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
```

## 6. Plantilla de app (`apps/_template`)

La carpeta [`apps/_template`](../apps/_template/README.md) contiene la plantilla canónica.
No se publica. Para crear una app:

```bash
npx create-expo-app@latest apps/<slug> --template default
# copiar app/, src/, docs/, app.json y tsconfig.json desde apps/_template
npx expo install expo-router react-native-safe-area-context react-native-screens \
  expo-linking expo-constants expo-status-bar \
  @react-native-async-storage/async-storage react-native-google-mobile-ads
```

Después: actualizar `slug`, `scheme`, `package` y el nombre en `app.json`, y rellenar
`docs/REQUIREMENTS.md`, `docs/PLAN.md` y `docs/memory.md`.

## 7. Flujo de trabajo por app (qué agente en cada paso)

| Paso | Agente | Entrada | Salida |
| --- | --- | --- | --- |
| 1. Idea / inventario | `explorer` (opcional) | Repo | Rutas y resumen de lo existente |
| 2. Especificación | `spec-writer` | Idea aprobada | `apps/<slug>/docs/REQUIREMENTS.md` |
| 3. Plan táctico | `architect` | REQUIREMENTS.md | `apps/<slug>/docs/PLAN.md` + `docs/ARCHITECTURE.md` si hay decisión estructural |
| 4. Implementación | `implementer` | PLAN.md aprobado | Código en `apps/<slug>` + `memory.md` |
| 5. Tests | `test-writer` | Código implementado | Tests Jest + Testing Library en verde |
| 6. Seguridad | `security-reviewer` | Código + `app.json` | Informe de hallazgos (bloquea si es crítico) |
| 7. Legal y protección de datos | `legal-reviewer` | Código + `app.json` + docs | `apps/<slug>/docs/LEGAL.md` y textos legales |
| 8. Publicación Play Store | `store-reviewer` | Código + ficha + docs | Informe de bloqueos y hallazgos |
| 9. Documentación | `doc-reviewer` | Código + docs | Informe de discrepancias |
| 10. Higiene / merge | `janitor` | Cambios revisados | `.gitignore`, commits atómicos `tipo(app): descripción` |

Reglas de encadenado: `spec-writer` no escribe código; `implementer` no reinterpreta la
spec ni toca `REQUIREMENTS.md`/`PLAN.md`; `security-reviewer`, `store-reviewer` y
`doc-reviewer` solo leen y reportan; `legal-reviewer` escribe solo textos legales;
`janitor` nunca commitea en `main`/`develop`.

Nota: el `db-reviewer` del proyecto de ejemplo se omite a propósito — no hay base de
datos (Cero Backend, persistencia local con AsyncStorage).

### Cómo lanzar el flujo

El usuario da una orden global (p. ej. "comienza el spec de `tip-split`") y el agente
`orchestrator` la ejecuta:

```text
explorer (opcional)
  → spec-writer: REQUIREMENTS.md ── gate usuario ──
  → architect: PLAN.md (+ ARCHITECTURE.md si hay decisión estructural)
  → implementer: código + memory.md
  → en paralelo: test-writer │ security-reviewer │ legal-reviewer │ store-reviewer
  → doc-reviewer: coherencia final
  → janitor: .gitignore + commits atómicos tipo(app): descripción
```

`debug` entra bajo demanda en cualquier paso. Gates obligatorios: spec aprobada antes de
plan, plan aprobado antes de código, y ningún merge si security-reviewer,
legal-reviewer o store-reviewer reportan bloqueo.

### Gestión de issues

Todo hallazgo de revisión se convierte en issue de GitHub con severidad
`BAJO`/`MEDIO`/`ALTO`/`CRITICO` (skill `issue-tracking`). Título:
`[<app-slug>][<SEVERIDAD>] <descripción>`. Los `BAJO` se preguntan al usuario si se
corrigen; los `MEDIO`/`ALTO`/`CRITICO` se corrigen de inmediato. El estado de cada issue
se registra y sincroniza en `apps/<app-slug>/docs/issues.md`.

## 8. MCP recomendados e instalados

Configuración aplicada en [`.mcp.json`](../.mcp.json):

| Servidor | Tipo | Config | Uso |
| --- | --- | --- | --- |
| Context7 | stdio (`npx`) | `@upstash/context7-mcp` | Documentación actualizada de React Native, Expo, AsyncStorage y AdMob |
| GitHub | http | `https://api.githubcopilot.com/mcp/` | PRs atómicos, una app por PR |
| Expo | stdio (`npx`) | `expo-mcp --dev-server-url http://localhost:8081` | Docs de Expo y control de la app sobre un dev server activo |
| Sequential Thinking | stdio (`npx`) | `@modelcontextprotocol/server-sequential-thinking` | Planificación del `PLAN.md` |
| Memory | stdio (`npx`) | `@modelcontextprotocol/server-memory` | Knowledge graph entre sesiones |

### Activación

1. Sustituye `YOUR_GITHUB_PAT` en [`.mcp.json`](../.mcp.json) por un PAT con scopes
   `repo`, `contents` y `pull_requests`.
2. En Roo Code, abre el panel **MCP Servers** y pulsa **Restart** para que lea `.mcp.json`.
3. Arranca el dev server de una app (`npx expo start`) antes de usar el MCP de Expo; si el puerto no es 8081, ajusta `--dev-server-url` en [`.mcp.json`](../.mcp.json). Context7, Sequential Thinking y Memory no requieren nada más.

### Evitar

MCPs de base de datos remota, Firebase o analítica (violan Cero Backend) y MCPs de
navegador como Playwright/Chrome DevTools (orientados a web, no a React Native).
