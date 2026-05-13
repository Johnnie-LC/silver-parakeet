import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/products/ProductCard";
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

describe("ProductCard", () => {
  it("muestra la información principal del producto", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("img", { name: product.title })).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
  });

  it("muestra la descripción del producto", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});
