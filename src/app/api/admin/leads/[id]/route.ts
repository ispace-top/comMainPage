import { NextRequest, NextResponse } from "next/server";
import { updateLead, deleteLead } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  updateLead(Number(id), body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteLead(Number(id));
  return NextResponse.json({ success: true });
}
