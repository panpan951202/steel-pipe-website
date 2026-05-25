import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-blue-200">
        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-blue-900 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">{product.shortName}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
              {product.shortName}
            </h3>
            <Badge className="text-xs">{product.category}</Badge>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-2">{product.name}</p>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.tagline}</p>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{product.sizeRange}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
