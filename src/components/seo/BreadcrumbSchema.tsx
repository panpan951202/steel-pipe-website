import { SITE_URL } from "@/lib/constants";
import JsonLd from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `${SITE_URL}${item.href}` : undefined,
      })),
    ],
  };

  return <JsonLd data={data} />;
}
