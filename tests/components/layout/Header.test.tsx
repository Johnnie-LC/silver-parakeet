import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";
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

describe("Header", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  it("muestra logo y navegación principal", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Marketplace" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  it("muestra badge con la cantidad total de items del carrito", () => {
    useCartStore.setState({
      items: [
        { product, quantity: 2 },
        { product: { ...product, id: 2, title: "Camiseta" }, quantity: 1 },
      ],
      total: 209.97,
    });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Cart, 3 items" })).toHaveAttribute(
      "href",
      "/cart"
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
