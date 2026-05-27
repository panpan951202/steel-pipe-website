import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/news/ArticleCard";
import { getAllNews } from "@/lib/news";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industry News & Technical Articles - Steel Pipe Insights",
  description:
    "Stay updated with the latest steel pipe industry news, technical guides, market trends, and insights. Expert articles on SMLS, ERW, LSAW, and SSAW steel pipe technologies.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const articles = getAllNews();

  return (
    <>
      <Container>
        <Breadcrumb items={[{ label: "News" }]} />
      </Container>

      <Container className="py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Industry News & Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with the latest developments in the steel pipe industry.
            Technical guides, market trends, and expert analysis from our engineering team.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
