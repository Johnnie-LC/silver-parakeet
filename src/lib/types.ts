export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface Filters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}
