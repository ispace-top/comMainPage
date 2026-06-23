import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    smtpHost,
    smtpPort,
    encryption,
    fromEmail,
    fromPassword,
    fromName,
    recipients,
  } = body;

  if (!smtpHost || !fromEmail || !fromPassword || !recipients) {
    return NextResponse.json({ success: false, message: "请完整填写 SMTP 服务器、发件邮箱、密码和收件人" }, { status: 400 });
  }

  const recips = recipients.split("\n").map((s: string) => s.trim()).filter(Boolean);
  if (recips.length === 0) {
    return NextResponse.json({ success: false, message: "收件人列表为空" }, { status: 400 });
  }

  const useTls = encryption === "SSL/TLS";
  const useStarttls = encryption !== "SSL/TLS" && encryption !== "无";

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || (useTls ? 465 : 587),
      secure: useTls,
      ...(useStarttls ? { requireTLS: true } : {}),
      auth: {
        user: fromEmail,
        pass: fromPassword,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: fromName ? `"${fromName}" <${fromEmail}>` : fromEmail,
      to: recips.join(", "),
      subject: "[" + (fromName || "CMS") + "] 测试邮件",
      text: "这是一封测试邮件。如果您收到此邮件，说明 SMTP 邮件通知配置正确。\n\n发送时间：" + new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
      html: "<div style='font-family:sans-serif;max-width:480px;margin:0 auto'><h2 style='color:#4f46e5'>邮件配置验证成功</h2><p>如果您收到此邮件，说明 SMTP 邮件通知配置正确。</p><p style='color:#9ca3af;font-size:13px'>发送时间：" + new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }) + "</p></div>",
    });

    return NextResponse.json({ success: true, message: `测试邮件已发送至 ${info.accepted.join(", ")}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "未知错误";
    return NextResponse.json({ success: false, message: `发送失败：${msg}` }, { status: 500 });
  }
}
