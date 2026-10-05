---
name: debugging
description: >
  Método de diagnóstico y catálogo de fallos característicos del stack Expo/React Native de este
  monorrepo. Úsala ante cualquier error, comportamiento inesperado, test que falla sin motivo o algo
  que funciona en un entorno y no en otro.
---

# Depuración (Expo / React Native)

## Método

1. **Reproduce antes de tocar nada.** Si no puedes reproducirlo, no sabes si lo has arreglado.
2. **Lee el error entero**, incluida la traza y los logs de Metro/Expo (`npx expo start`).
3. **Una hipótesis cada vez.** Cambiar tres cosas a la vez y que funcione no es depurar.
4. **Escribe el test que falla** antes del arreglo; es el test de regresión.
5. Si el fallo es de severidad media o superior, repórtalo al orquestador y anótalo en `memory.md`.

Prohibido declarar algo arreglado sin haberlo ejecutado.

## Catálogo de fallos de este stack

Antes de investigar a fondo, descarta estos. Son los que se repiten.

### `Cannot find module 'expo-router'` / 'react-native' / un paquete
La app no tiene `node_modules` propio o el paquete no se instaló. Cada app es autocontenida:
`cd apps/<slug> && npx expo install <paquete>`.

### Metro sirve código viejo o se queda colgado
Caché de Metro. `npx expo start -c`. En Linux no hace falta watchman: Metro usa el watcher
de Node; si va lento, plantéate instalar watchman.

### Los anuncios no cargan
Comprueba en orden: (1) sin conexión los anuncios fallan en silencio (INV-003); (2) IDs de
prueba (INV-002); (3) AdMob NO funciona en Expo Go: requiere development build
(`npx expo run:android`); (4) en EEE/UK, flujo de consentimiento UMP antes de cargar.

### AsyncStorage devuelve null o no persiste
Clave distinta entre escritura y lectura, o el `JSON.parse` falla y el wrapper lo traga
(devuelve null). Revisa los nombres de clave y que `load`/`save` usen la misma.

### El tema no cambia entre claro/oscuro
`useColorScheme` depende del tema del sistema y de `userInterfaceStyle: automatic` en
`app.json`. Comprueba ambos antes de tocar la paleta.

### Pantalla en blanco o la ruta no existe
Expo Router es por ficheros: la ruta debe existir como `app/<ruta>.tsx` y estar registrada
en el `Stack` de `app/_layout.tsx`. Comprueba también el `scheme` en `app.json`.

### Funciona en un emulador y no en otro / en físico no
API level distinto, `newArchEnabled`, o mezcla de Expo Go con development build. Verifica
qué target usa cada entorno.

### El test pasa solo pero falla en conjunto
Estado compartido entre tests: mocks de AsyncStorage sin reset, timers o estado global.
Haz los tests independientes y ejecutables en cualquier orden (`beforeEach` con limpieza).

### Error de tipos que "no debería" ocurrir
TypeScript estricto. Revisa tipos literales de la paleta y usa tipos anchos (`ThemeColors`)
en vez de inferir literales.

### Un commit "arregla" anuncios con IDs reales
Eso no es un arreglo: es una infracción (INV-002). Los IDs reales solo van en configuración
de producción, nunca hardcodeados.

## Qué NO hacer

- Añadir `sleep` o `setTimeout` para "arreglar" una condición de carrera.
- Desactivar TypeScript estricto, un lint o un test que molesta.
- Ampliar un timeout sin entender por qué se agota.
- Borrar los datos del usuario (`AsyncStorage.clear`) para salir del paso.
- Hardcodear IDs reales de AdMob o desactivar el consentimiento UMP.
