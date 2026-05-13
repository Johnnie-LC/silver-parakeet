"use client";

import { useState } from "react";

import { ProductCard } from "@/components/products/ProductCard";
import type { Category, Filters, Product } from "@/lib/types";

interface ProductFiltersProps {
  products: Product[];
  categories: Category[];
}

function getDefaultMaxPrice(products: Product[]): number {
  return Math.ceil(
    products.reduce(
      (highestPrice, product) =>
        product.price > highestPrice ? product.price : highestPrice,
      0
    )
  );
}

export function ProductFilters({
  products,
  categories,
}: ProductFiltersProps) {
  const defaultMaxPrice = getDefaultMaxPrice(products);
  const [filters, setFilters] = useState<Filters>({
    query: "",
    category: "todas",
    minPrice: 0,
    maxPrice: defaultMaxPrice,
  });

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title
      .toLowerCase()
      .includes(filters.query.toLowerCase());
    const matchesCategory =
      filters.category === "todas" || product.category === filters.category;
    const matchesMinPrice = product.price >= filters.minPrice;
    const matchesMaxPrice = product.price <= filters.maxPrice;

    return (
      matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice
    );
  });

  return (
    <section className="space-y-6">
      <div className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="sm:col-span-2 xl:col-span-1">
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            Buscar
          </label>
          <input
            id="product-search"
            type="search"
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value,
              }))
            }
            placeholder="Buscar por nombre"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="product-category"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            Categoria
          </label>
          <select
            id="product-category"
            value={filters.category}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                category: event.target.value,
              }))
            }
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          >
            <option value="todas">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="min-price"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            Precio minimo
          </label>
          <input
            id="min-price"
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                minPrice: Number(event.target.value || 0),
              }))
            }
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="max-price"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            Precio maximo
          </label>
          <input
            id="max-price"
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                maxPrice: Number(event.target.value || 0),
              }))
            }
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <p className="text-base font-medium text-zinc-900">
            No se encontraron productos
          </p>
        </div>
      )}
    </section>
  );
}
