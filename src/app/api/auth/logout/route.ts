import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth-server";

export async function POST() {
  let res = NextResponse.json({ ok: true });
  res = clearAuthCookie(res);
  return res;
}
