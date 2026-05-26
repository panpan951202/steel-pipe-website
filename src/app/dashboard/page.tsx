"use client";

import { useState, useEffect } from "react";

interface ContentItem {
  slug: string;
  name?: string;
  title?: string;
  shortName?: string;
  category?: string;
  date?: string;
  excerpt?: string;
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ContentItem[]>([]);
  const [newsList, setNewsList] = useState<ContentItem[]>([]);
  const [tab, setTab] = useState<"products" | "news">("products");
  const [editing, setEditing] = useState<{
    type: string;
    slug: string;
    data: Record<string, unknown>;
    body: string;
  } | null>(null);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    const savedPass = localStorage.getItem("admin_pass");
    const savedToken = localStorage.getItem("github_token");
    if (savedPass) setPassword(savedPass);
    if (savedToken) setGithubToken(savedToken);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "steelpipe2025" || password === (localStorage.getItem("admin_pass") || "")) {
      localStorage.setItem("admin_pass", password);
      if (githubToken) localStorage.setItem("github_token", githubToken);
      setLoggedIn(true);
    } else {
      setError("Incorrect password");
    }
  }

  async function loadContent() {
    const [pRes, nRes] = await Promise.all([
      fetch("/api/admin/content?type=product"),
      fetch("/api/admin/content?type=news"),
    ]);
    if (pRes.ok) setProducts((await pRes.json()).items || []);
    if (nRes.ok) setNewsList((await nRes.json()).items || []);
  }

  useEffect(() => {
    if (loggedIn) loadContent();
  }, [loggedIn]);

  async function handleEdit(type: string, slug: string) {
    setLoading(true);
    const res = await fetch(`/api/admin/content?type=${type}&slug=${slug}`);
    const data = await res.json();
    if (data.found) {
      setEditing({ type, slug, data: data.frontmatter, body: data.body });
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const token = localStorage.getItem("github_token") || githubToken;
    if (!token) {
      setSaveMsg("Please enter your GitHub token first");
      return;
    }
    setLoading(true);
    setSaveMsg("");
    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: editing.type,
        slug: editing.slug,
        frontmatter: editing.data,
        body: editing.body,
        githubToken: token,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setEditing(null);
      setSaveMsg("Saved! Site will update in 1-2 minutes.");
    } else {
      setSaveMsg("Error: " + (data.error || "Failed"));
    }
    setLoading(false);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            autoFocus
          />
          <input
            type="password" value={githubToken} onChange={e => setGithubToken(e.target.value)}
            placeholder="GitHub Token (for saving - saved in browser)"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">
            Login
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Token stored in browser only. Create at github.com/settings/tokens (repo scope)
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Content Manager</h1>
          <button onClick={() => { localStorage.clear(); setLoggedIn(false); }}
            className="text-sm text-gray-600 hover:text-red-600">Logout</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setTab("products")}
            className={`px-6 py-2 rounded-lg font-medium ${tab === "products" ? "bg-blue-900 text-white" : "bg-white text-gray-700"}`}>
            Products ({products.length})
          </button>
          <button onClick={() => setTab("news")}
            className={`px-6 py-2 rounded-lg font-medium ${tab === "news" ? "bg-blue-900 text-white" : "bg-white text-gray-700"}`}>
            News ({newsList.length})
          </button>
        </div>

        {saveMsg && (
          <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${saveMsg.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {saveMsg}
            <button onClick={() => setSaveMsg("")} className="ml-4 underline">Dismiss</button>
          </div>
        )}

        <div className="grid gap-4">
          {(tab === "products" ? products : newsList).map(item => (
            <div key={item.slug} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {item.shortName && <span className="text-blue-900 font-bold mr-2">{item.shortName}</span>}
                  <h3 className="font-bold text-lg">{item.name || item.title}</h3>
                  {item.category && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.category}</span>}
                </div>
                {item.date && <p className="text-sm text-gray-500 mt-1">{item.date}</p>}
                {item.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-1">{item.excerpt}</p>}
              </div>
              <button onClick={() => handleEdit(tab === "products" ? "product" : "news", item.slug)}
                className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg font-medium hover:bg-blue-100">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit: {editing.data.name || editing.data.title || editing.slug}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {Object.entries(editing.data)
                .filter(([key]) => !["specifications", "faq", "applications", "standards", "features", "tags", "gallery"].includes(key))
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                    {typeof value === "string" && value.length > 100 ? (
                      <textarea
                        value={value as string}
                        onChange={e => setEditing({ ...editing, data: { ...editing.data, [key]: e.target.value } })}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={typeof value === "string" ? value : JSON.stringify(value)}
                        onChange={e => setEditing({ ...editing, data: { ...editing.data, [key]: e.target.value } })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    )}
                  </div>
                ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Body</label>
                <textarea
                  value={editing.body}
                  onChange={e => setEditing({ ...editing, body: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
              </div>
            </div>
            <div className="p-6 border-t bg-white flex gap-4">
              <button onClick={handleSave} disabled={loading}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setEditing(null)}
                className="px-6 py-3 border rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
