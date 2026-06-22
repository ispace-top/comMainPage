import { NextRequest, NextResponse } from "next/server";
import { getAllSettings, setSetting } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAllSettings());
}

export async function PUT(request: NextRequest) {
  const body = await request.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    setSetting(key, typeof value === "string" ? value : JSON.stringify(value));
  }
  return NextResponse.json({ success: true });
}
