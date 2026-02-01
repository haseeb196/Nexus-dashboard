import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { parse, serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "nexus-dashboard-secret-key-change-in-prod";
const COOKIE_NAME = "nexus_token";

// ─── In-memory user store (replace with DB in production) ───
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin" | "analyst" | "viewer";
  createdAt: string;
}

const users: User[] = [];

// Seed default admin
(async () => {
  const hash = await bcrypt.hash("admin123", 10);
  users.push({
    id: "1",
    email: "admin@nexus.io",
    name: "Alex Morgan",
    passwordHash: hash,
    role: "admin",
    createdAt: new Date().toISOString(),
  });
})();

// ─── User CRUD ───
export function findByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(email: string, name: string, password: string): Promise<User> {
  if (findByEmail(email)) throw new Error("User already exists");
  const hash = await bcrypt.hash(password, 10);
  const user: User = {
    id: String(Date.now()),
    email,
    name,
    passwordHash: hash,
    role: users.length === 0 ? "admin" : "analyst",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ─── JWT ───
export function signToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

// ─── Cookie helpers ───
export function setAuthCookie<T>(res: NextResponse<T>, token: string): NextResponse<T> {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export function clearAuthCookie<T>(res: NextResponse<T>): NextResponse<T> {
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  return cookies[COOKIE_NAME] || null;
}

// ─── Auth middleware helper ───
export function authenticateRequest(req: NextRequest): { user: User } | { error: string } {
  const token = getTokenFromRequest(req);
  if (!token) return { error: "No token" };
  const payload = verifyToken(token);
  if (!payload) return { error: "Invalid token" };
  const user = users.find((u) => u.id === payload.userId);
  if (!user) return { error: "User not found" };
  return { user };
}

export function sanitizeUser(user: User) {
  const { passwordHash, ...safe } = user;
  return safe;
}
