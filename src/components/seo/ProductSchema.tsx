import { SITE_URL, COMPANY_NAME } from "@/lib/constants";
import type { Product } from "@/types/product";
import JsonLd from "./JsonLd";

export default function ProductSchema({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    category: product.category,
    manufacturer: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return <JsonLd data={data} />;
}
