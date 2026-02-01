export async function loginUser(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function registerUser(email: string, name: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function logoutUser() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function checkAuth(): Promise<boolean> {
  const res = await fetch("/api/auth/me");
  return res.ok;
}

export async function getMe() {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  return res.json();
}
