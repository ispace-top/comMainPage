import { NextRequest, NextResponse } from "next/server";
import { getSetting, setSetting } from "@/lib/db";

const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
const DEFAULT_EDITOR_PASS = process.env.EDITOR_PASSWORD || "editor123";

export async function PUT(request: NextRequest) {
  const { username, currentPassword, newPassword } = await request.json();

  if (!username || !currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
  }

  // Determine which env var and DB key to use
  const isAdmin = process.env.ADMIN_USERNAME
    ? username === process.env.ADMIN_USERNAME
    : username === "admin";

  const dbKey = isAdmin ? "adminPassword" : "editorPassword";
  const envDefault = isAdmin ? DEFAULT_ADMIN_PASS : DEFAULT_EDITOR_PASS;
  const currentStored = getSetting(dbKey) || envDefault;

  if (currentPassword !== currentStored) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 403 });
  }

  setSetting(dbKey, newPassword);
  return NextResponse.json({ success: true });
}
