import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="aspect-square overflow-hidden bg-zinc-100"
      >
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {product.category}
        </span>
        <h3 className="font-semibold text-zinc-900">
          <Link href={`/products/${product.id}`} className="hover:text-zinc-700">
            {product.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-600">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-amber-500">
            {"★".repeat(Math.round(product.rating))}
          </span>
        </div>
      </div>
    </article>
  );
}
