"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

interface ProductDetailProps {
  product?: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-zinc-600">
          El producto que buscas no existe o ya no está disponible.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        Volver al catálogo
      </Link>

      <article className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:items-start">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
          <Image
            src={product.image}
            alt={product.title}
            width={800}
            height={800}
            priority
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <section className="flex flex-col gap-5">
          <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {product.category}
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between border-y border-zinc-200 py-4">
            <span className="text-3xl font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-amber-500">
              {"★".repeat(Math.round(product.rating))}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Agregar al carrito
          </button>
          {added ? (
            <p className="text-sm font-medium text-emerald-700">
              Producto agregado al carrito.
            </p>
          ) : null}
        </section>
      </article>
    </main>
  );
}
