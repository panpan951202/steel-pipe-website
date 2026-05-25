import Link from "next/link";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { getAllProducts } from "@/lib/products";

export default function ProductOverview() {
  const products = getAllProducts();

  return (
    <Section title="Our Product Range" subtitle="Five specialized steel pipe categories for every application">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <span className="text-blue-900 font-bold text-sm">{product.shortName}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.shortName}</h3>
            <Badge className="mb-2 text-xs">{product.category}</Badge>
            <p className="text-sm text-gray-600 line-clamp-2">{product.tagline}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
