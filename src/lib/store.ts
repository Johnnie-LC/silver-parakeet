import { create } from "zustand";

import type { CartItem, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

function calculateTotal(items: CartItem[]): number {
  const total = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return Math.round(total * 100) / 100;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const items = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          items,
          total: calculateTotal(items),
        };
      }

      const items = [...state.items, { product, quantity: 1 }];

      return {
        items,
        total: calculateTotal(items),
      };
    }),
  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter((item) => item.product.id !== productId);

      return {
        items,
        total: calculateTotal(items),
      };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter((item) => item.product.id !== productId)
          : state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            );

      return {
        items,
        total: calculateTotal(items),
      };
    }),
  clearCart: () =>
    set({
      items: [],
      total: 0,
    }),
}));
