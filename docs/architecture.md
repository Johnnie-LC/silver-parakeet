# Arquitectura — Qué significa "hacer un buen trabajo"

> Este documento define el estándar de calidad. Los agentes revisores
> evalúan código contra este archivo. Si no está aquí, no es un requisito.

## Principios

1. **Capas claras.** El proyecto tiene cuatro capas:
   - `src/app/` — rutas y layouts de Next.js App Router (Server Components por defecto).
   - `src/components/` — componentes de UI organizados por dominio (`ui/`, `products/`, `cart/`, `layout/`).
   - `src/lib/` — lógica pura: tipos, datos mock, store de Zustand, utilidades.
   - `tests/` — tests de componentes y lógica.
   No introducir capas adicionales hasta que haya una razón documentada en `feature_list.json`.

2. **Sin dependencias externas innecesarias.** Solo Next.js, React, TypeScript, Tailwind CSS y Zustand.
   Si una feature requiere una dependencia extra, primero se discute (estado `blocked`).

3. **Server Components primero.** Por defecto los componentes en `src/app/` son Server Components.
   Usar `"use client"` solo cuando sea necesario (interactividad, hooks, estado).

4. **Estado global mínimo.** Zustand para el carrito. Estado local (`useState`) para lo demás.
   No meter en Zustand lo que puede ser prop-drilling simple.

5. **Mock data primero.** Los datos vienen de `src/lib/data.ts`. Cuando se necesite una API real,
   se agrega como feature separada.

## Flujo de datos

```
usuario  ─→  app/ (Server Components)
               │
               ├─ renderiza componentes de components/
               │
               ├─ consume datos de lib/data.ts
               │
               └─ estado interactivo → lib/store.ts (Zustand)
                        │
                        └─ carrito persistido en localStorage
```

## Estructura de componentes

```
src/components/
├── ui/           # Primitivas reutilizables: Button, Input, Card, Badge, Modal
├── products/     # ProductCard, ProductGrid, ProductFilters, ProductDetail
├── cart/         # CartItem, CartSummary, CheckoutForm
└── layout/       # Header, Footer, Navbar
```

## Qué NO hacer

- ❌ No usar `"use client"` en componentes que no necesitan interactividad.
- ❌ No mezclar lógica de negocio dentro de componentes de UI.
- ❌ No hacer fetching de datos en componentes cliente si se puede hacer en server.
- ❌ No añadir sistema de routing externo (React Router). Usar App Router nativo.
- ❌ No usar `any` en TypeScript. Tipar correctamente o usar `unknown`.
- ❌ No mutar el store de Zustand fuera de las acciones definidas.

## Convención de rutas

| Ruta               | Componente         | Propósito                     |
|--------------------|--------------------|-------------------------------|
| `/`                | `page.tsx`         | Listado de productos          |
| `/products/[id]`   | `page.tsx`         | Detalle de producto           |
| `/cart`            | `page.tsx`         | Carrito de compras            |
| `/checkout`        | `page.tsx`         | Checkout simulado             |
