import { getSetting } from "@/lib/db";
import type { PushSettings } from "@/lib/admin-store";
import nodemailer from "nodemailer";

interface LeadData {
  name: string;
  phone: string;
  company: string;
  service: string;
  source_url: string;
}

function buildAdminUrl(requestUrl?: string): string {
  if (!requestUrl) return "";
  try {
    const url = new URL(requestUrl);
    return `${url.origin}/admin/leads`;
  } catch {
    return "";
  }
}

function fillTemplate(template: string, lead: LeadData, adminUrl: string): string {
  return template
    .replace(/\{name\}/g, lead.name || "-")
    .replace(/\{phone\}/g, lead.phone || "-")
    .replace(/\{company\}/g, lead.company || "-")
    .replace(/\{service_name\}/g, lead.service || "-")
    .replace(/\{source_url\}/g, lead.source_url || "-")
    .replace(/\{admin_url\}/g, adminUrl || "-");
}

const defaultCardTemplate = [
  "咨询类型：{service_name}",
  "联系电话：{phone}",
  "所属公司：{company}",
  "来源页面：{source_url}",
  "",
  "点击卡片查看线索详情 →",
].join("\n");

// ── WeCom Bot (群机器人 webhook → 图文卡片) ──────────────────────

function buildNewsCard(
  lead: LeadData,
  bot: PushSettings["weworkBot"],
  adminUrl: string
) {
  const descTemplate = bot.template || defaultCardTemplate;
  const description = fillTemplate(descTemplate, lead, adminUrl);

  const companyPart = lead.company ? ` | ${lead.company}` : "";
  const title = `新线索 — ${lead.name}${companyPart}`;

  return {
    msgtype: "news" as const,
    news: {
      articles: [
        {
          title: title.slice(0, 64),
          description: description.slice(0, 512),
          url: adminUrl || "about:blank",
          picurl: bot.picurl || "",
        },
      ],
    },
  };
}

async function sendWeworkBot(
  bot: PushSettings["weworkBot"],
  lead: LeadData,
  adminUrl: string
): Promise<void> {
  const body = buildNewsCard(lead, bot, adminUrl);
  await fetch(bot.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── WeCom App Message (企业微信应用消息 API → 图文卡片) ───────────

async function sendWeworkWebhook(
  cfg: PushSettings["weworkWebhook"],
  lead: LeadData,
  adminUrl: string
): Promise<void> {
  const descTemplate = cfg.template || defaultCardTemplate;
  const description = fillTemplate(descTemplate, lead, adminUrl);
  const companyPart = lead.company ? ` | ${lead.company}` : "";
  const title = `新线索 — ${lead.name}${companyPart}`;

  // 1. Get access_token
  const tokenRes = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${cfg.corpId}&corpsecret=${cfg.corpSecret}`
  );
  const tokenData = await tokenRes.json() as { errcode: number; access_token?: string };
  if (tokenData.errcode !== 0 || !tokenData.access_token) {
    throw new Error(`获取企微 access_token 失败: ${JSON.stringify(tokenData)}`);
  }

  // 2. Send news card
  const sendRes = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${tokenData.access_token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        touser: cfg.toUser || "@all",
        msgtype: "news",
        agentid: Number(cfg.agentId),
        news: {
          articles: [
            {
              title: title.slice(0, 64),
              description: description.slice(0, 512),
              url: adminUrl || "about:blank",
              picurl: cfg.picurl || "",
            },
          ],
        },
      }),
    }
  );
  const sendData = await sendRes.json() as { errcode: number; errmsg?: string };
  if (sendData.errcode !== 0) {
    throw new Error(`企微应用消息发送失败: ${sendData.errmsg || JSON.stringify(sendData)}`);
  }
}

// ── Email (SMTP) ─────────────────────────────────────────────────

async function sendEmail(
  cfg: PushSettings["email"],
  lead: LeadData,
  adminUrl: string
): Promise<void> {
  const useTls = cfg.encryption === "SSL/TLS";
  const useStarttls = !useTls && cfg.encryption !== "无";

  const transporter = nodemailer.createTransport({
    host: cfg.smtpHost,
    port: Number(cfg.smtpPort) || (useTls ? 465 : 587),
    secure: useTls,
    ...(useStarttls ? { requireTLS: true } : {}),
    auth: {
      user: cfg.fromEmail,
      pass: cfg.fromPassword,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  const recips = cfg.recipients.split("\n").map((s) => s.trim()).filter(Boolean);
  if (recips.length === 0) return;

  const subject = `新线索通知 — ${lead.name} | ${lead.company || "未填公司"}`;
  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
  <div style="background:#4f46e5;color:#fff;padding:20px 24px">
    <h2 style="margin:0;font-size:18px">新线索通知</h2>
    <p style="margin:4px 0 0;opacity:0.85;font-size:13px">官网有新咨询登记</p>
  </div>
  <div style="padding:20px 24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 0;color:#6b7280;width:56px">姓名</td><td style="padding:8px 0;color:#111827;font-weight:500">${lead.name || "-"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">电话</td><td style="padding:8px 0;color:#111827;font-weight:500">${lead.phone || "-"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">公司</td><td style="padding:8px 0;color:#111827;font-weight:500">${lead.company || "-"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">服务</td><td style="padding:8px 0;color:#111827;font-weight:500">${lead.service || "-"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">来源</td><td style="padding:8px 0"><a href="${lead.source_url || "#"}" style="color:#4f46e5">${lead.source_url || "-"}</a></td></tr>
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb">
      <a href="${adminUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500">前往后台查看</a>
    </div>
  </div>
</div>`.trim();

  await transporter.sendMail({
    from: cfg.fromName ? `"${cfg.fromName}" <${cfg.fromEmail}>` : cfg.fromEmail,
    to: recips.join(", "),
    subject,
    text: `新线索：${lead.name} | ${lead.phone} | ${lead.company} | ${lead.service}`,
    html,
  });
}

// ── Main export ──────────────────────────────────────────────────

export async function notifyNewLead(
  lead: LeadData,
  requestUrl?: string
): Promise<void> {
  const raw = getSetting("pushSettings");
  if (!raw) return;

  let settings: PushSettings;
  try {
    settings = JSON.parse(raw);
  } catch {
    return;
  }

  const adminUrl = buildAdminUrl(requestUrl);

  const tasks: Promise<void>[] = [];

  // WeCom Bot (群机器人 → 图文卡片)
  if (settings.weworkBot?.enabled && settings.weworkBot?.webhookUrl) {
    tasks.push(
      sendWeworkBot(settings.weworkBot, lead, adminUrl).catch((e) =>
        console.error("[notify] 企微机器人发送失败:", (e as Error).message)
      )
    );
    console.log("[notify] 企微机器人 — 已加入发送队列");
  } else {
    console.log("[notify] 企微机器人 — 未启用或未配置 webhookUrl");
  }

  // WeCom App Message (企业微信应用消息 → 图文卡片)
  if (
    settings.weworkWebhook?.enabled &&
    settings.weworkWebhook?.corpId &&
    settings.weworkWebhook?.corpSecret &&
    settings.weworkWebhook?.agentId
  ) {
    tasks.push(
      sendWeworkWebhook(settings.weworkWebhook, lead, adminUrl).catch((e) =>
        console.error("[notify] 企微应用消息发送失败:", (e as Error).message)
      )
    );
    console.log("[notify] 企微应用消息 — 已加入发送队列");
  } else {
    console.log("[notify] 企微应用消息 — 未启用或配置不完整");
  }

  // Email (SMTP)
  if (
    settings.email?.enabled &&
    settings.email?.smtpHost &&
    settings.email?.fromEmail &&
    settings.email?.fromPassword &&
    settings.email?.recipients
  ) {
    tasks.push(
      sendEmail(settings.email, lead, adminUrl).catch((e) =>
        console.error("[notify] 邮件发送失败:", (e as Error).message)
      )
    );
    console.log("[notify] 邮件通知 — 已加入发送队列");
  } else {
    console.log("[notify] 邮件通知 — 未启用或配置不完整");
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks);
  } else {
    console.log("[notify] 无启用且配置完整的通知渠道，跳过发送");
  }
}
