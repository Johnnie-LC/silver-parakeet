"use client";

import { useState } from "react";
import Link from "next/link";

import { useCartStore } from "@/lib/store";

interface CheckoutFormValues {
  name: string;
  email: string;
  address: string;
  card: string;
}

interface CheckoutFormErrors {
  name?: string;
  email?: string;
  address?: string;
  card?: string;
}

const INITIAL_VALUES: CheckoutFormValues = {
  name: "",
  email: "",
  address: "",
  card: "",
};

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function validate(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Ingresa tu nombre.";
  }

  if (!values.email.trim()) {
    errors.email = "Ingresa tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un email valido.";
  }

  if (!values.address.trim()) {
    errors.address = "Ingresa tu direccion.";
  }

  if (!values.card.trim()) {
    errors.card = "Ingresa tu tarjeta.";
  }

  return errors;
}

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);
  const [values, setValues] = useState<CheckoutFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Pedido confirmado
        </h1>
        <p className="mt-3 text-zinc-600">
          Tu orden fue registrada correctamente.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Volver al inicio
        </Link>
      </main>
    );
  }

  const handleChange =
    (field: keyof CheckoutFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }));

      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    clearCart();
    setSubmitted(true);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Checkout
        </h1>
        <p className="text-sm text-zinc-600">
          Completa tus datos y revisa el resumen antes de confirmar.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Direccion
            </label>
            <textarea
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange("address")}
              rows={4}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
            {errors.address ? (
              <p className="mt-2 text-sm text-red-600">{errors.address}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="card"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Tarjeta
            </label>
            <input
              id="card"
              name="card"
              value={values.card}
              onChange={handleChange("card")}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
            {errors.card ? (
              <p className="mt-2 text-sm text-red-600">{errors.card}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Confirmar pedido
          </button>
        </form>

        <aside className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-900">
            Resumen de la orden
          </h2>
          <div className="mt-4 space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-zinc-900">
                      {item.product.title}
                    </p>
                    <p className="text-zinc-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-zinc-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-600">No hay productos en tu orden.</p>
            )}
          </div>
          <div className="mt-4 border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-zinc-600">Total</span>
              <span className="font-semibold text-zinc-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
