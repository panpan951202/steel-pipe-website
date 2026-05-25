import { SITE_URL, COMPANY_NAME } from "@/lib/constants";
import type { NewsArticle } from "@/types/news";
import JsonLd from "./JsonLd";

export default function ArticleSchema({ article }: { article: NewsArticle }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `${SITE_URL}${article.image}` : undefined,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
  };

  return <JsonLd data={data} />;
}
