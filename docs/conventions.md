# Convenciones de código

> Homogeneidad extrema. La IA predice mejor cuando el repositorio se parece
> a sí mismo en todas partes.

## Estilo TypeScript / React

- **Versión:** TypeScript 5+, React 19, Next.js 16.
- **Formato:** Prettier por defecto (si se configura). Líneas máximo 100 caracteres.
- **Imports:** React/Next primero, luego librerías, luego locales. Agrupados y ordenados.
- **Strings:** comillas dobles `"..."` siempre. Comillas simples solo para escapar.
- **Template literals** para interpolación. Nada de concatenación con `+`.

## Nombres

| Tipo                    | Convención        | Ejemplo                         |
|-------------------------|-------------------|---------------------------------|
| Componentes             | `PascalCase`      | `ProductCard`, `CartSummary`    |
| Archivos de componentes | `PascalCase`      | `ProductCard.tsx`               |
| Hooks                   | `camelCase` prefijo `use` | `useCartStore`, `useFilters` |
| Funciones y variables   | `camelCase`       | `addItem`, `filteredProducts`   |
| Constantes              | `UPPER_SNAKE`     | `DEFAULT_CATEGORY`              |
| Tipos e interfaces      | `PascalCase`      | `Product`, `CartItem`           |
| Archivos de lib         | `camelCase`       | `store.ts`, `data.ts`           |

## Estructura de archivo

Cada componente de React sigue este orden:

```tsx
"use client";  // solo si necesario

import { ... } from "react";
import { ... } from "next/link";
import { ... } from "zustand";
import { ... } from "@/lib/types";
import { ... } from "@/components/ui/...";
```

## Estilos (Tailwind CSS)

- Usar utility classes de Tailwind directamente en JSX.
- Preferir `className` sobre CSS modules o CSS-in-JS.
- Estilos responsivos con prefijos `sm:`, `md:`, `lg:`.
- Colores del theme de Tailwind, no valores hardcodeados.
- Animaciones con clases Tailwind (`transition`, `hover:`, `group-hover:`).

## Tests (Vitest + React Testing Library)

- Un archivo de test por componente/módulo: `tests/components/products/ProductCard.test.tsx`.
- Usar `describe` para agrupar y `it` para casos individuales.
- Cada test renderiza el componente y verifica salida con `screen.getByText`, `expect(...).toBeInTheDocument()`
- Preferir `userEvent` sobre `fireEvent` para simular interacciones.
- Nombres descriptivos: `it("muestra el precio formateado USD")`.

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductCard } from "@/components/products/ProductCard";
```

## Manejo de errores

- Componentes que reciben props inválidas: renderizar null o mensaje claro.
- Páginas con id inexistente: mensaje de error en la página, no redirigir.
- Errores de tipos: TypeScript estricto. Nunca usar `as` para engañar al compilador.

## Comentarios

Por defecto **no** se escriben. Solo se permiten cuando explican un *por qué*
no obvio. Los nombres deben hacer el resto.
