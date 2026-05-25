import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { getLatestNews } from "@/lib/news";
import { formatDate } from "@/lib/utils";

export default function LatestNews() {
  const articles = getLatestNews();

  return (
    <Section
      title="Industry Insights & News"
      subtitle="Stay informed with the latest developments in the steel pipe industry"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/news" variant="outline">
          View All Articles
        </Button>
      </div>
    </Section>
  );
}
