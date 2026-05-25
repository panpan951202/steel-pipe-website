import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NewsArticle } from "@/types/news";

const newsDir = path.join(process.cwd(), "content/news");

function readNewsFile(filename: string): NewsArticle | null {
  const filePath = path.join(newsDir, filename);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...data,
    image: data.image || "",
    tags: data.tags || [],
    content: content.trim(),
  } as NewsArticle;
}

export function getAllNews(): NewsArticle[] {
  if (!fs.existsSync(newsDir)) return [];
  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));
  return files
    .map(readNewsFile)
    .filter((n): n is NewsArticle => n !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  const articles = getAllNews();
  return articles.find((n) => n.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((n) => n.slug);
}

export function getLatestNews(count: number = 3): NewsArticle[] {
  return getAllNews().slice(0, count);
}
