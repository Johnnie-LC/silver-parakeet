import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductFilters } from "@/components/products/ProductFilters";
import { categories, products } from "@/lib/data";

describe("ProductFilters", () => {
  it("filtra por nombre sin distinguir mayusculas", () => {
    render(<ProductFilters products={products} categories={categories} />);

    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "auriculares" },
    });

    expect(
      screen.getAllByRole("link", { name: "Auriculares Bluetooth Pro" })
    ).toHaveLength(2);
    expect(
      screen.queryAllByRole("link", { name: "Smartwatch Deportivo" })
    ).toHaveLength(0);
  });

  it("filtra por categoria y rango de precio en combinacion", () => {
    render(<ProductFilters products={products} categories={categories} />);

    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "ropa" },
    });
    fireEvent.change(screen.getByLabelText("Precio minimo"), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText("Precio maximo"), {
      target: { value: "100" },
    });

    expect(
      screen.getAllByRole("link", { name: "Chaqueta Impermeable" })
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("link", { name: "Mochila Urbana 25L" })
    ).toHaveLength(2);
    expect(
      screen.queryAllByRole("link", { name: "Camiseta Algodón Premium" })
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole("link", { name: "Auriculares Bluetooth Pro" })
    ).toHaveLength(0);
  });

  it("muestra un mensaje claro cuando no hay resultados", () => {
    render(<ProductFilters products={products} categories={categories} />);

    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "producto inexistente" },
    });

    expect(
      screen.getByText("No se encontraron productos")
    ).toBeInTheDocument();
  });
});
