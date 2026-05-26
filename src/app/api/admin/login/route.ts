import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "steelpipe2025";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === ADMIN_PASSWORD) {
    const token = Buffer.from(ADMIN_PASSWORD + ":" + Date.now()).toString("base64");
    const res = NextResponse.json({ success: true, token });
    res.cookies.set("admin_token", token, {
      httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 86400,
    });
    return res;
  }
  return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
}
