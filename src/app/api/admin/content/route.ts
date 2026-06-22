import { NextRequest, NextResponse } from "next/server";
import { getContent, addContent, type ContentType } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = (searchParams.get("type") || "banner") as ContentType;
  const items = getContent(type);
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = addContent({
    type: body.type || "banner",
    title: body.title || "",
    status: body.status || "draft",
    category: body.category || "",
    industry: body.industry || "",
    summary: body.summary || "",
    body: body.body || "",
    created: new Date().toISOString().slice(0, 10),
  });
  return NextResponse.json(item, { status: 201 });
}
