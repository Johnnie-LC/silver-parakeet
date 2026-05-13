import { describe, it, expect } from "vitest";
import { products, categories } from "@/lib/data";

describe("mock data", () => {
  const categoryIds = new Set(categories.map((category) => category.id));

  it("products array has items", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("each product has required fields", () => {
    for (const p of products) {
      expect(p.id).toBeGreaterThan(0);
      expect(typeof p.title).toBe("string");
      expect(p.title.length).toBeGreaterThan(0);
      expect(typeof p.description).toBe("string");
      expect(p.description.length).toBeGreaterThan(0);
      expect(typeof p.price).toBe("number");
      expect(p.price).toBeGreaterThan(0);
      expect(typeof p.category).toBe("string");
      expect(categoryIds.has(p.category)).toBe(true);
      expect(typeof p.image).toBe("string");
      expect(p.image.length).toBeGreaterThan(0);
      expect(typeof p.rating).toBe("number");
      expect(p.rating).toBeGreaterThanOrEqual(0);
      expect(p.rating).toBeLessThanOrEqual(5);
    }
  });

  it("product ids are unique", () => {
    const productIds = products.map((product) => product.id);

    expect(new Set(productIds).size).toBe(productIds.length);
  });

  it("categories array has items", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it("each category has id and name", () => {
    for (const c of categories) {
      expect(typeof c.id).toBe("string");
      expect(c.id.length).toBeGreaterThan(0);
      expect(typeof c.name).toBe("string");
      expect(c.name.length).toBeGreaterThan(0);
    }
  });

  it("category ids are unique", () => {
    expect(categoryIds.size).toBe(categories.length);
  });
});
