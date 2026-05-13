import { ProductDetail } from "@/components/products/ProductDetail";
import { getProductById, products } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = Number.isInteger(productId)
    ? getProductById(productId)
    : undefined;

  return <ProductDetail product={product} />;
}
