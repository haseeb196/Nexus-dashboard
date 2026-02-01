import { NextRequest, NextResponse } from "next/server";
import { createUser, signToken, setAuthCookie, sanitizeUser } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();
    if (!email || !name || !password)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    if (password.length < 6)
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    const user = await createUser(email, name, password);
    const token = signToken(user.id, user.email);
    let res = NextResponse.json({ user: sanitizeUser(user) });
    res = setAuthCookie(res, token);
    return res;
  } catch (e: any) {
    if (e.message === "User already exists")
      return NextResponse.json({ error: e.message }, { status: 409 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
