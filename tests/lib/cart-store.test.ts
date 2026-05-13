import { beforeEach, describe, expect, it } from "vitest";

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

const secondProduct: Product = {
  ...product,
  id: 2,
  title: "Camiseta Algodón Premium",
  price: 29.99,
};

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  it("addItem agrega un producto nuevo", () => {
    useCartStore.getState().addItem(product);

    expect(useCartStore.getState().items).toEqual([
      {
        product,
        quantity: 1,
      },
    ]);
    expect(useCartStore.getState().total).toBe(89.99);
  });

  it("addItem incrementa la cantidad si el producto ya existe", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    expect(useCartStore.getState().items).toEqual([
      {
        product,
        quantity: 2,
      },
    ]);
    expect(useCartStore.getState().total).toBe(179.98);
  });

  it("removeItem elimina un producto por productId", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(secondProduct);

    useCartStore.getState().removeItem(product.id);

    expect(useCartStore.getState().items).toEqual([
      {
        product: secondProduct,
        quantity: 1,
      },
    ]);
    expect(useCartStore.getState().total).toBe(29.99);
  });

  it("updateQuantity actualiza la cantidad de un item", () => {
    useCartStore.getState().addItem(product);

    useCartStore.getState().updateQuantity(product.id, 3);

    expect(useCartStore.getState().items).toEqual([
      {
        product,
        quantity: 3,
      },
    ]);
    expect(useCartStore.getState().total).toBe(269.97);
  });

  it("updateQuantity remueve el item si la cantidad llega a 0", () => {
    useCartStore.getState().addItem(product);

    useCartStore.getState().updateQuantity(product.id, 0);

    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });

  it("total suma precio por cantidad de cada item", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(secondProduct);

    expect(useCartStore.getState().total).toBe(209.97);
  });

  it("clearCart vacia el carrito y reinicia el total", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(secondProduct);

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });
});
