import { NextResponse } from "next/server";
import { getLeadStats } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getLeadStats());
}
