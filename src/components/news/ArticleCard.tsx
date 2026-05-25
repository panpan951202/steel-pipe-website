import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";

interface ArticleCardProps {
  article: NewsArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-blue-200">
        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          <svg className="w-16 h-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="text-xs">{article.category}</Badge>
            <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
