import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getNewsBySlug, getAllNewsSlugs, getLatestNews } from "@/lib/news";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Not Found" };

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function NewsDetailPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  const latestArticles = getLatestNews(5).filter((a) => a.slug !== article.slug);

  return (
    <>
      <ArticleSchema article={article} />
      <BreadcrumbSchema
        items={[
          { label: "News", href: "/news" },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      />

      <Container>
        <Breadcrumb
          items={[
            { label: "News", href: "/news" },
            { label: article.title },
          ]}
        />
      </Container>

      <article className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge>{article.category}</Badge>
                  <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                  <span className="text-sm text-gray-400">by {article.author}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>
                <p className="text-lg text-gray-600">{article.excerpt}</p>
              </header>

              <div className="prose prose-gray max-w-none">
                {article.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (/^\d+\.\s/.test(paragraph)) {
                    const items = paragraph.split('\n').filter(Boolean);
                    return (
                      <ol key={i} className="list-decimal pl-6 space-y-2 mb-4">
                        {items.map((item, j) => (
                          <li key={j} className="text-gray-700">
                            {item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Latest Articles</h3>
                <ul className="space-y-4">
                  {latestArticles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/news/${a.slug}`}
                        className="group block"
                      >
                        <p className="text-sm text-gray-900 font-medium group-hover:text-blue-900 transition-colors line-clamp-2">
                          {a.title}
                        </p>
                        <span className="text-xs text-gray-500 mt-1">{formatDate(a.date)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* CTA */}
      <section className="py-16 bg-gray-50 mt-8">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Looking for Steel Pipe Solutions?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Speak with our technical team about your project requirements.
          </p>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}
