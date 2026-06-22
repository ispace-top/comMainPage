import { NextRequest, NextResponse } from "next/server";
import { getLeads, addLead } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const leads = getLeads({ status, search });
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const lead = addLead({
    name: body.name || "",
    phone: body.phone || "",
    company: body.company || "",
    service: body.service || "",
    source_url: body.source_url || "",
    status: body.status || "new",
    time: new Date().toISOString().replace("T", " ").slice(0, 16),
  });
  return NextResponse.json(lead, { status: 201 });
}
