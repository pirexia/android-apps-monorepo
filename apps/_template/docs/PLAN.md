# Plan — <Nombre de la App>

## Estado

`planning` (idea → planning → implementing → testing → security-review → done)

## Tareas

- [ ] 1. Scaffold de la app desde `apps/_template`.
- [ ] 2. Tema y navegación base (Stack + Dark/Light).
- [ ] 3. Lógica de negocio con persistencia en AsyncStorage.
- [ ] 4. Pantalla de ajustes con política de privacidad (INV-004).
- [ ] 5. Integración del banner de AdMob con IDs de prueba (INV-002).
- [ ] 6. Tests unitarios (Jest + Testing Library).
- [ ] 7. Revisión de seguridad (permisos, AdMob, privacidad).
- [ ] 8. Documentación final y cierre del DoD.

## Notas de arquitectura

- Rutas Expo Router: `index.tsx` (utilidad) y `settings.tsx` (ajustes).
- Sin dependencias HTTP en la lógica de negocio.
