import { NextResponse } from "next/server";
import matter from "gray-matter";

const GITHUB_REPO = "panpan951202/steel-pipe-website";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { type, slug, frontmatter: fm, body: bodyContent, githubToken } = body;

  if (!type || !slug) {
    return NextResponse.json({ error: "Missing type or slug" }, { status: 400 });
  }

  const token = githubToken || process.env.ADMIN_GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No GitHub token configured" }, { status: 400 });
  }

  const apiPath = `content/${type === "product" ? "products" : "news"}/${slug}.md`;

  try {
    // Get current SHA
    const shaRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${apiPath}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!shaRes.ok) {
      const err = await shaRes.json().catch(() => ({}));
      return NextResponse.json({ error: "GitHub API error: " + (err.message || shaRes.status) }, { status: 500 });
    }
    const shaData = await shaRes.json();
    const sha = shaData.sha;

    // Build new content
    const cleanFm: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fm)) {
      if (key !== "body" && key !== "slug" && key !== "filename") {
        cleanFm[key] = value;
      }
    }
    const newContent = matter.stringify((bodyContent || "").trim(), cleanFm);
    const content = Buffer.from(newContent).toString("base64");

    // Commit
    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${apiPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update ${type}: ${slug}`,
          content,
          sha,
        }),
      }
    );

    if (updateRes.ok) {
      return NextResponse.json({ success: true });
    }
    const updateErr = await updateRes.json().catch(() => ({}));
    return NextResponse.json({ error: updateErr.message || "Save failed" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
