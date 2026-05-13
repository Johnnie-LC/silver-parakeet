# Marketplace Frontend

Frontend de un marketplace construido con Next.js App Router, TypeScript,
Tailwind CSS, Vitest y Zustand. El proyecto usa datos mock locales y sirve
como ejemplo de Harness Engineering aplicado a una app React.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zustand
- Vitest + Testing Library

## Scripts

```bash
npm run dev         # entorno de desarrollo
npm run build       # build de produccion
npm run start       # servir build de produccion
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run test:watch  # vitest en watch mode
./init.sh           # verificacion completa del proyecto
```

## Rutas principales

- `/` listado de productos con busqueda y filtros
- `/products/[id]` detalle de producto
- `/cart` carrito de compras
- `/checkout` checkout simulado

## Funcionalidad implementada

- Catalogo con mock data tipada
- Cards de producto y detalle de producto
- Layout global con header, footer y badge de carrito
- Store global de carrito con Zustand
- Pagina de carrito con controles de cantidad
- Checkout con validacion basica y confirmacion
- Busqueda por nombre y filtros por categoria y precio

## Estructura

```text
src/
  app/          rutas y layout de Next.js
  components/   UI por dominio: layout, products, cart
  lib/          tipos, mock data y store de Zustand
tests/          tests de componentes y logica
docs/           arquitectura, convenciones y verificacion
progress/       estado de sesion e historial
```

## Desarrollo local

1. Instala dependencias:

```bash
npm install
```

2. Inicia el entorno de desarrollo:

```bash
npm run dev
```

3. Abre `http://localhost:3000`.

## Verificacion

La forma canonica de validar el repo es:

```bash
./init.sh
```

Ese comando ejecuta:

- type-check
- lint
- tests
- build

Nota: el build usa `next/font` con Geist y puede requerir acceso de red para
descargar las fuentes de Google durante la compilacion.
