import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CartPage } from "@/components/cart/CartPage";
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

describe("CartPage", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  it("muestra el estado vacio del carrito", () => {
    render(<CartPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Tu carrito está vacío" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Agrega productos desde el catálogo para continuar con tu compra."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ir al catálogo" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("muestra items, controles y resumen del carrito", () => {
    useCartStore.setState({
      items: [{ product, quantity: 2 }],
      total: 179.98,
    });

    render(<CartPage />);

    expect(
      screen.getByRole("img", { name: product.title })
    ).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText("Precio unitario: $89.99")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $179.98")).toBeInTheDocument();
    expect(screen.getByText("Resumen")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByText("$179.98")).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Continuar al checkout" })
    ).toHaveAttribute("href", "/checkout");
  });

  it("permite cambiar cantidad y eliminar items", () => {
    useCartStore.setState({
      items: [{ product, quantity: 1 }],
      total: 89.99,
    });

    render(<CartPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: `Aumentar cantidad de ${product.title}`,
      })
    );
    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
    expect(useCartStore.getState().total).toBe(179.98);

    fireEvent.click(
      screen.getByRole("button", {
        name: `Reducir cantidad de ${product.title}`,
      })
    );
    expect(useCartStore.getState().items[0]?.quantity).toBe(1);
    expect(useCartStore.getState().total).toBe(89.99);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });
});
