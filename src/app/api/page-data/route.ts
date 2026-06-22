import { NextResponse } from "next/server";
import { getSetting } from "@/lib/db";
import { PAGE_DATA as FALLBACK } from "@/lib/seed-data";

export async function GET() {
  try {
    const raw = getSetting("pageData");
    if (raw) return NextResponse.json(JSON.parse(raw));
  } catch { /* fall through to fallback */ }
  return NextResponse.json(FALLBACK);
}
