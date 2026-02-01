import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest, sanitizeUser, clearAuthCookie } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 401 });
  return NextResponse.json({ user: sanitizeUser(result.user) });
}

export async function POST(req: NextRequest) {
  // Logout
  let res = NextResponse.json({ ok: true });
  res = clearAuthCookie(res);
  return res;
}
