"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/lib/store";

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (items.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-zinc-600">
          Agrega productos desde el catálogo para continuar con tu compra.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Ir al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Carrito
        </h1>
        <p className="text-sm text-zinc-600">
          Revisa tus productos antes de continuar al checkout.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section className="space-y-4">
          {items.map((item) => {
            const subtotal = item.product.price * item.quantity;

            return (
              <article
                key={item.product.id}
                className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-[96px_minmax(0,1fr)]"
              >
                <div className="overflow-hidden rounded-md bg-zinc-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    width={96}
                    height={96}
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-semibold text-zinc-900">
                        {item.product.title}
                      </h2>
                      <p className="text-sm text-zinc-600">
                        Precio unitario: {formatPrice(item.product.price)}
                      </p>
                      <p className="text-sm text-zinc-600">
                        Subtotal: {formatPrice(subtotal)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-md border border-zinc-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-10 w-10 text-lg text-zinc-700 transition hover:bg-zinc-100"
                        aria-label={`Reducir cantidad de ${item.product.title}`}
                      >
                        -
                      </button>
                      <span className="flex h-10 min-w-12 items-center justify-center border-x border-zinc-200 px-3 text-sm font-medium text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-10 w-10 text-lg text-zinc-700 transition hover:bg-zinc-100"
                        aria-label={`Aumentar cantidad de ${item.product.title}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-medium text-zinc-700">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-900">Resumen</h2>
          <dl className="mt-4 space-y-3 text-sm text-zinc-600">
            <div className="flex items-center justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-medium text-zinc-900">{formatPrice(total)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
              <dt>Total</dt>
              <dd className="text-base font-semibold text-zinc-900">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Continuar al checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
