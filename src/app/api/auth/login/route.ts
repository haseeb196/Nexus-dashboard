import { NextRequest, NextResponse } from "next/server";
import { findByEmail, verifyPassword, signToken, setAuthCookie, sanitizeUser } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const user = findByEmail(email);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = signToken(user.id, user.email);
    let res = NextResponse.json({ user: sanitizeUser(user) });
    res = setAuthCookie(res, token);
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
