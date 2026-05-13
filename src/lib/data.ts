import type { Product, Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "electronica", name: "Electrónica" },
  { id: "ropa", name: "Ropa y Accesorios" },
  { id: "hogar", name: "Hogar" },
  { id: "deportes", name: "Deportes" },
  { id: "libros", name: "Libros" },
];

export const products: Product[] = [
  {
    id: 1,
    title: "Auriculares Bluetooth Pro",
    description: "Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería.",
    price: 89.99,
    category: "electronica",
    image: "https://picsum.photos/seed/headphones/400/400",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Camiseta Algodón Premium",
    description: "Camiseta de algodón orgánico, corte regular, disponible en 5 colores.",
    price: 29.99,
    category: "ropa",
    image: "https://picsum.photos/seed/tshirt/400/400",
    rating: 4.2,
  },
  {
    id: 3,
    title: "Lámpara LED Inteligente",
    description: "Lámpara WiFi compatible con Alexa y Google Home. 16 millones de colores.",
    price: 49.99,
    category: "hogar",
    image: "https://picsum.photos/seed/lamp/400/400",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Zapatillas Running Ultralight",
    description: "Zapatillas con amortiguación reactiva y suela de carbono para máximo rendimiento.",
    price: 129.99,
    category: "deportes",
    image: "https://picsum.photos/seed/sneakers/400/400",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Libro: TypeScript Avanzado",
    description: "Guía completa de patrones y técnicas avanzadas en TypeScript para profesionales.",
    price: 39.99,
    category: "libros",
    image: "https://picsum.photos/seed/typescript-book/400/400",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Smartwatch Deportivo",
    description: "GPS, monitor cardíaco, resistencia al agua 50m. Ideal para atletas.",
    price: 199.99,
    category: "electronica",
    image: "https://picsum.photos/seed/watch/400/400",
    rating: 4.6,
  },
  {
    id: 7,
    title: "Chaqueta Impermeable",
    description: "Chaqueta transpirable con membrana impermeable, costuras selladas y capucha ajustable.",
    price: 89.99,
    category: "ropa",
    image: "https://picsum.photos/seed/jacket/400/400",
    rating: 4.3,
  },
  {
    id: 8,
    title: "Set de Sartenes Antiadherentes",
    description: "Juego de 3 sartenes con recubrimiento cerámico, aptas para inducción.",
    price: 69.99,
    category: "hogar",
    image: "https://picsum.photos/seed/pans/400/400",
    rating: 4.1,
  },
  {
    id: 9,
    title: "Bicicleta Montaña 29\"",
    description: "Suspensión delantera, cambios Shimano 21 velocidades, frenos de disco.",
    price: 449.99,
    category: "deportes",
    image: "https://picsum.photos/seed/bike/400/400",
    rating: 4.5,
  },
  {
    id: 10,
    title: "Libro: Diseño de Sistemas",
    description: "Arquitectura de software, microservicios y patrones de diseño en sistemas modernos.",
    price: 44.99,
    category: "libros",
    image: "https://picsum.photos/seed/system-design/400/400",
    rating: 4.9,
  },
  {
    id: 11,
    title: "Teclado Mecánico RGB",
    description: "Switches Cherry MX, retroiluminación RGB personalizable, layout 60%.",
    price: 119.99,
    category: "electronica",
    image: "https://picsum.photos/seed/keyboard/400/400",
    rating: 4.7,
  },
  {
    id: 12,
    title: "Mochila Urbana 25L",
    description: "Compartimento para laptop 15\", puerto USB integrado, tejido resistente al agua.",
    price: 59.99,
    category: "ropa",
    image: "https://picsum.photos/seed/backpack/400/400",
    rating: 4.4,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "todas") return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
