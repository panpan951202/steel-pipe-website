import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/products";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Steel Pipe Products - SMLS, ERW, LSAW, SSAW, HSAW",
  description:
    "Comprehensive range of steel pipes: Seamless (SMLS), ERW, LSAW, SSAW, and HSAW. Diameters from 1/8\" to 120\" for oil & gas, water, construction, and industrial applications.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <Container>
        <Breadcrumb items={[{ label: "Products" }]} />
      </Container>

      <Container className="py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Steel Pipe Products</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            From seamless pipes for high-pressure applications to large-diameter welded pipes
            for major infrastructure projects, our five product categories cover the full
            spectrum of steel pipe requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}
