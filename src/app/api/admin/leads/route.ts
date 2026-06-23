import { NextRequest, NextResponse } from "next/server";
import { getLeads, addLead } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const leads = getLeads({ status, search });
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Server-side validation: reject missing required fields
  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  if (!name) {
    return NextResponse.json({ error: "姓名不能为空" }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "手机号不能为空" }, { status: 400 });
  }

  const lead = addLead({
    name,
    phone,
    company: (body.company || "").trim(),
    service: body.service || "",
    source_url: body.source_url || "",
    status: body.status || "new",
    time: new Date().toISOString().replace("T", " ").slice(0, 16),
  });

  // Only send notification for public form submissions, not admin-created leads
  const referer = request.headers.get("referer") || "";
  const isFromAdmin = referer.includes("/admin");
  if (!isFromAdmin) {
    console.log("[leads] 公开表单提交，触发通知 — referer:", referer);
    notifyNewLead(
      {
        name: lead.name,
        phone: lead.phone,
        company: lead.company,
        service: lead.service,
        source_url: lead.source_url,
      },
      request.url
    );
  } else {
    console.log("[leads] 管理员后台创建，跳过通知 — referer:", referer);
  }

  return NextResponse.json(lead, { status: 201 });
}
