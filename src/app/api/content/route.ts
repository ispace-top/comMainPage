import { NextRequest, NextResponse } from "next/server";
import { getContent, type ContentType } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = (searchParams.get("type") || "services") as ContentType;
  const items = getContent(type).filter((item) => item.status === "published");
  return NextResponse.json(items);
}
