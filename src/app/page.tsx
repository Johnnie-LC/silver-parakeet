import { ProductFilters } from "@/components/products/ProductFilters";
import { categories, products } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <section>
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900">
          Productos destacados
        </h1>
        <ProductFilters products={products} categories={categories} />
      </section>
    </main>
  );
}
