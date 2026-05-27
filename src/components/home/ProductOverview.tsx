import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { getAllProducts } from "@/lib/products";

export default function ProductOverview() {
  const products = getAllProducts();

  return (
    <Section title="Our Product Range" subtitle="Premium steel pipe categories for every application">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200"
          >
            <div className="h-40 bg-gray-100 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{product.shortName}</h3>
              <Badge className="mb-2 text-xs">{product.category}</Badge>
              <p className="text-sm text-gray-600 line-clamp-2">{product.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
