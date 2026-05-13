import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CheckoutPage } from "@/components/cart/CheckoutPage";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

const product: Product = {
  id: 1,
  title: "Auriculares Bluetooth Pro",
  description: "Auriculares inalámbricos con cancelación de ruido activa.",
  price: 89.99,
  category: "electronica",
  image: "https://picsum.photos/seed/headphones/400/400",
  rating: 4.5,
};

describe("CheckoutPage", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  it("muestra formulario y resumen de la orden", () => {
    useCartStore.setState({
      items: [{ product, quantity: 2 }],
      total: 179.98,
    });

    render(<CheckoutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Checkout" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Direccion")).toBeInTheDocument();
    expect(screen.getByLabelText("Tarjeta")).toBeInTheDocument();
    expect(screen.getByText("Resumen de la orden")).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
    expect(screen.getAllByText("$179.98")).toHaveLength(2);
  });

  it("valida campos requeridos y email valido", () => {
    render(<CheckoutPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "correo-invalido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un email valido.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa tu direccion.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa tu tarjeta.")).toBeInTheDocument();
  });

  it("confirma el pedido, muestra exito y vacia el carrito", () => {
    useCartStore.setState({
      items: [{ product, quantity: 1 }],
      total: 89.99,
    });

    render(<CheckoutPage />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Direccion"), {
      target: { value: "Calle 123" },
    });
    fireEvent.change(screen.getByLabelText("Tarjeta"), {
      target: { value: "4242 4242 4242 4242" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Pedido confirmado" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tu orden fue registrada correctamente.")
    ).toBeInTheDocument();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });
});
