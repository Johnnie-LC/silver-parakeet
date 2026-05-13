import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ProductDetail } from "@/components/products/ProductDetail";
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

describe("ProductDetail", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  it("muestra la información completa del producto", () => {
    render(<ProductDetail product={product} />);

    expect(screen.getByRole("img", { name: product.title })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: product.title })
    ).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Agregar al carrito" })
    ).toBeInTheDocument();
  });

  it("agrega el producto al carrito de Zustand", () => {
    render(<ProductDetail product={product} />);

    fireEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));

    expect(useCartStore.getState().items).toEqual([
      {
        product,
        quantity: 1,
      },
    ]);
    expect(screen.getByText("Producto agregado al carrito.")).toBeInTheDocument();
  });

  it("muestra un mensaje claro si el producto no existe", () => {
    render(<ProductDetail />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Producto no encontrado" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("El producto que buscas no existe o ya no está disponible.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al catálogo" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
