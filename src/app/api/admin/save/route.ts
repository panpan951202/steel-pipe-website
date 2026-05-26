import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "steelpipe2025";
const GITHUB_TOKEN = process.env.ADMIN_GITHUB_TOKEN || "";
const GITHUB_REPO = "panpan951202/steel-pipe-website";

async function checkAuth(request: Request) {
  const c = request.headers.get("cookie") || "";
  const token = c.split("admin_token=")[1]?.split(";")[0];
  if (!token) return false;
  return true;
}

export async function POST(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug, frontmatter: fm, body: bodyContent } = await request.json();

  if (!type || !slug) {
    return NextResponse.json({ error: "Missing type or slug" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "content", type === "product" ? "products" : "news");
  const files = fs.readdirSync(dir).filter((f: string) => f.endsWith(".md"));
  let targetFile = "";
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const d = matter(raw).data;
    if (d.slug === slug) { targetFile = f; break; }
  }

  if (!targetFile) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  const newMatter = matter.stringify((bodyContent || "").trim(), fm);
  const filePath = path.join(dir, targetFile);

  if (GITHUB_TOKEN) {
    try {
      const apiPath = `content/${type === "product" ? "products" : "news"}/${targetFile}`;
      const content = Buffer.from(newMatter).toString("base64");

      const shaRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${apiPath}`,
        { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
      );
      const shaData = await shaRes.json();

      const updateRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${apiPath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Update ${type}: ${slug}`,
            content,
            sha: shaData.sha,
          }),
        }
      );

      if (updateRes.ok) {
        return NextResponse.json({ success: true });
      }
      const err = await updateRes.json();
      throw new Error(err.message || "GitHub API error");
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 500 });
    }
  }

  fs.writeFileSync(filePath, newMatter, "utf-8");
  return NextResponse.json({ success: true, local: true });
}
