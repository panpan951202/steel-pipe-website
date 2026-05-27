import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-blue-200 overflow-hidden">
        <div className="h-48 bg-gray-100 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
