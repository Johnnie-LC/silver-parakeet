# Bitácora histórica (append-only)

> Cada vez que se cierra una sesión, su resumen se añade aquí.
> No edites entradas anteriores. Solo añades al final.

---

## 2026-05-12 — Inicialización del proyecto y arnés
- **Agente:** humano (set up inicial)
- **Plan:** Crear proyecto Next.js con Harness Engineering para marketplace frontend.
- **Cambios:** Proyecto Next.js 16.2.6 con TypeScript + Tailwind + App Router. Arnés completo: AGENTS.md, CLAUDE.md, CHECKPOINTS.md, feature_list.json, init.sh, docs/ (architecture, conventions, verification), .claude/agents/ (leader, implementer, reviewer), progress/ (current, history). Dependencias: Zustand, Vitest, Testing Library. Tipos TS (Product, CartItem, Category), mock data (12 productos, 5 categorías). Página principal con grid de productos.
- **Verificación:** `./init.sh` verde. TypeScript, ESLint, 4 tests, build OK.
- **Cierre:** feature 1 (project_bootstrap) marcada `done`. Próximo: feature 2 (types_and_mock_data) ya implementada como parte del bootstrap, feature 3 (product_list_page) también.

---

## 2026-05-13 — Feature 2: types_and_mock_data
- **Agente:** Codex
- **Plan:** Revisar tipos y datos mock existentes, reforzar la validación de tests, ejecutar `./init.sh` y cerrar la feature.
- **Cambios:** `tests/lib/types.test.ts` ahora valida ids únicos, categorías referenciadas por productos, campos obligatorios no vacíos y rating dentro del rango 0-5.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 6 tests y build OK.
- **Cierre:** feature 2 marcada `done`. Próximo: feature 3 (`product_list_page`).

---

## 2026-05-13 — Feature 3: product_list_page
- **Agente:** Codex
- **Plan:** Extraer `ProductCard`, mantener `/` como grid responsivo de productos mock, agregar test de renderizado y ejecutar `./init.sh`.
- **Cambios:** Se creó `src/components/products/ProductCard.tsx`, `src/app/page.tsx` ahora renderiza el grid con ese componente y `tests/setup.ts` limpia el DOM entre tests. Se agregó `tests/components/products/ProductCard.test.tsx`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 8 tests y build OK.
- **Cierre:** feature 3 marcada `done`. Próximo: feature 4 (`product_detail_page`).

---

## 2026-05-13 — Feature 4: product_detail_page
- **Agente:** Codex
- **Plan:** Crear detalle de producto, ruta dinámica `/products/[id]`, botón de agregar al carrito con Zustand y tests de éxito/error.
- **Cambios:** Se creó `src/components/products/ProductDetail.tsx`, `src/app/products/[id]/page.tsx` y `src/lib/store.ts` con `addItem`. `ProductCard` ahora enlaza al detalle. Se agregó `tests/components/products/ProductDetail.test.tsx`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 11 tests y build OK.
- **Cierre:** feature 4 marcada `done`. Próximo: feature 5 (`layout_and_nav`).

---

## 2026-05-13 — Feature 5: layout_and_nav
- **Agente:** Codex
- **Plan:** Crear layout global con header/footer, conectar badge del carrito a Zustand, eliminar duplicados y cubrir componentes con tests.
- **Cambios:** Se crearon `src/components/layout/Header.tsx` y `Footer.tsx`. `src/app/layout.tsx` ahora renderiza navegación global y footer. Se limpiaron header/footer duplicados en `/` y `ProductDetail`. Se agregaron `tests/components/layout/Header.test.tsx` y `Footer.test.tsx`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 14 tests y build OK.
- **Cierre:** feature 5 marcada `done`. Próximo: feature 6 (`shopping_cart_store`).

---

## 2026-05-13 — Feature 6: shopping_cart_store
- **Agente:** Codex
- **Plan:** Completar el store de carrito con operaciones de agregar, remover, actualizar cantidad y total calculado; cubrirlo con tests unitarios.
- **Cambios:** `src/lib/store.ts` ahora expone `items`, `total`, `addItem`, `removeItem` y `updateQuantity`. Las acciones recalculan `total` redondeado a centavos. Se agregó `tests/lib/cart-store.test.ts` y se ajustaron tests existentes para resetear `total`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 20 tests y build OK.
- **Cierre:** feature 6 marcada `done`. Próximo: feature 7 (`cart_page`).

---

## 2026-05-13 — Feature 7: cart_page
- **Agente:** Codex
- **Plan:** Crear la ruta `/cart` con estado vacío, listado de items, controles de cantidad, resumen y tests del flujo principal.
- **Cambios:** Se crearon `src/components/cart/CartPage.tsx` y `src/app/cart/page.tsx`. La pantalla consume `useCartStore`, muestra items, subtotales, controles `+`/`-`, botón eliminar, resumen y link a checkout. Se agregó `tests/components/cart/CartPage.test.tsx`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 23 tests y build OK.
- **Cierre:** feature 7 marcada `done`. Próximo: feature 8 (`checkout_page`).

---

## 2026-05-13 — Feature 8: checkout_page
- **Agente:** Codex
- **Plan:** Crear la ruta `/checkout`, montar formulario con validación básica, mostrar resumen de orden y vaciar el carrito al confirmar.
- **Cambios:** Se agregó `clearCart` al store y su test. Se crearon `src/components/cart/CheckoutPage.tsx` y `src/app/checkout/page.tsx`. El checkout valida campos requeridos y email, muestra resumen de items/total y confirma el pedido limpiando el carrito. Se añadió `tests/components/cart/CheckoutPage.test.tsx`.
- **Verificación:** `./init.sh` verde con acceso de red para el build de Next. TypeScript, ESLint, 27 tests y build OK.
- **Cierre:** feature 8 marcada `done`. Próximo: feature 9 (`search_and_filters`).

---

## 2026-05-13 — Feature 9: search_and_filters
- **Agente:** Codex
- **Plan:** Añadir búsqueda por nombre, filtro de categoría, rango de precio combinable y estado sin resultados en la home.
- **Cambios:** Se creó `src/components/products/ProductFilters.tsx` y `src/app/page.tsx` ahora delega el catálogo a ese componente. La búsqueda es case-insensitive sobre el nombre, el filtro de categoría usa `select`, el rango usa mínimo/máximo y los filtros son combinables. Se agregó `tests/components/products/ProductFilters.test.tsx`.
- **Verificación:** `./init.sh` verde. TypeScript, ESLint, 30 tests y build OK.
- **Cierre:** feature 9 marcada `done`. Próximo: feature 10 (`create Readme`).

---

## 2026-05-13 — Feature 10: create Readme
- **Agente:** Codex
- **Plan:** Reemplazar el README del template por documentación real del proyecto y corregir la definición de la feature para que coincida con ese alcance.
- **Cambios:** Se actualizó `feature_list.json` para describir correctamente la feature 10. Se reemplazó `README.md` por documentación del stack, scripts, rutas, funcionalidades implementadas, estructura y verificación local.
- **Verificación:** `./init.sh` verde. TypeScript, ESLint, 30 tests y build OK.
- **Cierre:** feature 10 marcada `done`. No quedan features `pending`.
