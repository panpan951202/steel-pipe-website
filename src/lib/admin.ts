"use server";

import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "steelpipe2025";
const GITHUB_TOKEN = process.env.ADMIN_GITHUB_TOKEN || "";
const GITHUB_REPO = "panpan951202/steel-pipe-website";

export async function adminLogin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const c = await cookies();
    c.set("admin_token", Buffer.from(ADMIN_PASSWORD).toString("base64"), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 86400,
    });
    return { success: true };
  }
  return { success: false, error: "Incorrect password" };
}

export async function adminLogout() {
  const c = await cookies();
  c.delete("admin_token");
}

export async function checkAuth() {
  const c = await cookies();
  const token = c.get("admin_token")?.value;
  if (!token) return false;
  return Buffer.from(token, "base64").toString() === ADMIN_PASSWORD;
}

function getContentDir(type: "product" | "news") {
  return path.join(process.cwd(), "content", type === "product" ? "products" : "news");
}

export async function getContentList(type: "product" | "news") {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const { data } = matter(raw);
    return { slug: data.slug || f.replace(".md", ""), filename: f, ...data };
  });
}

export async function getContentDetail(type: "product" | "news", slug: string) {
  const dir = getContentDir(type);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { slug: data.slug, filename: f, data, body: content.trim() };
    }
  }
  return null;
}

export async function saveContent(
  type: "product" | "news",
  slug: string,
  formData: Record<string, unknown>,
  bodyContent: string
): Promise<{ success: boolean; error?: string }> {
  if (!GITHUB_TOKEN) {
    return { success: false, error: "GitHub token not configured" };
  }

  const detail = await getContentDetail(type, slug);
  if (!detail) return { success: false, error: "Content not found" };

  try {
    const newFrontmatter: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "body" && key !== "slug" && key !== "filename") {
        newFrontmatter[key] = value;
      }
    }

    const newMatter = matter.stringify(bodyContent, newFrontmatter);
    const filePath = `content/${type === "product" ? "products" : "news"}/${detail.filename}`;
    const content = Buffer.from(newMatter).toString("base64");

    const shaRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );
    const shaData = await shaRes.json();
    const sha = shaData.sha;

    if (!sha) return { success: false, error: "Could not get file SHA from GitHub" };

    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update ${type}: ${slug}`,
          content,
          sha,
        }),
      }
    );

    if (updateRes.ok) return { success: true };
    const err = await updateRes.json();
    return { success: false, error: err.message || "Failed to save" };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
