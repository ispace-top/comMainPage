import { NextRequest, NextResponse } from "next/server";
import { getSetting } from "@/lib/db";

// Defaults from environment variables (Docker-configurable)
const DEFAULT_ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
const DEFAULT_EDITOR_USER = process.env.EDITOR_USERNAME || "editor";
const DEFAULT_EDITOR_PASS = process.env.EDITOR_PASSWORD || "editor123";

function getUsers(): Record<string, { password: string; role: string }> {
  // Check for password overrides stored in DB (set via admin settings)
  const adminPass = getSetting("adminPassword");
  const editorPass = getSetting("editorPassword");

  return {
    [DEFAULT_ADMIN_USER]: { password: adminPass || DEFAULT_ADMIN_PASS, role: "admin" },
    [DEFAULT_EDITOR_USER]: { password: editorPass || DEFAULT_EDITOR_PASS, role: "editor" },
  };
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const users = getUsers();
  const user = users[username];
  if (user && user.password === password) {
    return NextResponse.json({
      username,
      role: user.role,
      token: Buffer.from(`${username}:${Date.now()}`).toString("base64"),
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
