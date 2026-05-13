# Verificación — Cómo demostrar que el trabajo funciona

> Regla de oro: **el agente no dice "funciona", lo demuestra**.
> Toda feature termina con evidencia ejecutable, no con afirmaciones.

## Niveles de verificación

### Nivel 1 — Lint y TypeScript (obligatorio)

```bash
npm run lint           # ESLint sin errores
npx tsc --noEmit       # TypeScript type-check sin errores
```

### Nivel 2 — Tests unitarios (obligatorio)

Todo componente público en `src/components/` y toda función en `src/lib/`
tiene al menos un test en `tests/` que:

1. Cubre el camino feliz.
2. Cubre al menos un camino de error si puede fallar.

```bash
npx vitest run         # Todos los tests pasan
npx vitest run --coverage  # Opcional: ver cobertura
```

### Nivel 3 — Build de producción (obligatorio)

```bash
npm run build          # next build exitoso
```

### Nivel 4 — Smoke test manual (opcional)

Antes de cerrar, navegar manualmente las rutas principales:
- `/` — listado de productos visible
- `/products/1` — detalle funciona
- `/cart` — carrito vacío o con items
- `/checkout` — formulario visible

## Anti-patrones (no hacer)

- ❌ "He añadido el componente, debería funcionar." → falta test ejecutable.
- ❌ Test que solo verifica que no lanza excepción. → tiene que comprobar resultado concreto.
- ❌ Mock de componentes hijos enteros en vez de testear comportamiento real.
- ❌ Marcar feature como `done` sin pasar `./init.sh` completo.

## Verificación final antes de cerrar

```bash
./init.sh              # debe terminar con [OK] Entorno listo
```

Si `./init.sh` está rojo, **no** marques nada como `done`. Anota el bloqueo
en `progress/current.md` con estado `blocked` en `feature_list.json`.
