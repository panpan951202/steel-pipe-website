import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Product } from "@/types/product";

const productsDir = path.join(process.cwd(), "content/products");

function readProductFile(filename: string): Product | null {
  const filePath = path.join(productsDir, filename);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    ...data,
    image: data.image || "",
    gallery: data.gallery || [],
    faq: data.faq || [],
    description: matter(raw).content.trim(),
  } as Product;
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(productsDir)) return [];
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".md"));
  return files
    .map(readProductFile)
    .filter((p): p is Product => p !== null)
    .sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  return getAllProducts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, count);
}
