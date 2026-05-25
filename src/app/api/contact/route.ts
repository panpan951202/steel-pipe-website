import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, product, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 在实际部署中，这里会集成邮件服务（SendGrid、Resend 等）
    // 目前将表单数据输出到控制台
    console.log("Contact Form Submission:", {
      name,
      email,
      phone,
      company,
      product,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Inquiry received." });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
