import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "product";
  const slug = url.searchParams.get("slug");

  const dir = path.join(process.cwd(), "content", type === "product" ? "products" : "news");

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ items: [] });
  }

  const files = fs.readdirSync(dir).filter((f: string) => f.endsWith(".md"));

  // Return single item detail
  if (slug) {
    for (const f of files) {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      if (data.slug === slug) {
        return NextResponse.json({ found: true, frontmatter: data, body: content.trim() });
      }
    }
    return NextResponse.json({ found: false });
  }

  // Return list
  const items = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug || f.replace(".md", ""),
      name: data.name,
      title: data.title,
      shortName: data.shortName,
      category: data.category,
      date: data.date,
      excerpt: data.excerpt,
    };
  });

  return NextResponse.json({ items });
}
