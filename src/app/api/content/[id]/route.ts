import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

function getDb() {
  const db = new Database(path.join(process.cwd(), "data", "cms.db"));
  db.pragma("journal_mode = WAL");
  return db;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const item = db.prepare("SELECT * FROM content WHERE id = ? AND status = 'published'").get(Number(id)) as any;
  db.close();
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
