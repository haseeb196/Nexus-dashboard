"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { ok, data } = isRegister
        ? await registerUser(email, name, password)
        : await loginUser(email, password);
      if (!ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="url(#g1)" />
              <path d="M10 22L18 10L26 22H10Z" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" fill="none" opacity="0.9"/>
              <circle cx="18" cy="22" r="3" fill="#06b6d4"/>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#0f172a"/><stop offset="1" stopColor="#1e293b"/></linearGradient></defs>
            </svg>
            <span style={{ fontFamily: "var(--font-family-display)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Nexus
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            {isRegister ? "Create your account to get started" : "Sign in to your dashboard"}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: 32 }}>
          {/* Toggle tabs */}
          <div style={{ display: "flex", gap: 4, background: "var(--bg-input)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {["Sign In", "Register"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setIsRegister(i === 1); setError(""); }}
                style={{
                  flex: 1, padding: "9px 0", border: "none", borderRadius: 8, cursor: "pointer",
                  background: isRegister === (i === 1) ? "var(--bg-card)" : "transparent",
                  color: isRegister === (i === 1) ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: 13, fontWeight: 500, fontFamily: "var(--font-family-body)",
                  transition: "all 0.2s", boxShadow: isRegister === (i === 1) ? "0 1px 4px rgba(0,0,0,0.3)" : "none"
                }}
              >{tab}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Full Name</label>
                <input className="input-dark" type="text" placeholder="Alex Morgan" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Email</label>
              <input className="input-dark" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Password</label>
              <input className="input-dark" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && (
              <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 18, color: "#fb7185", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Please wait…" : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo credentials hint */}
        <div style={{ textAlign: "center", marginTop: 24, padding: "12px 18px", background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 10 }}>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent-cyan)" }}>Demo credentials</strong><br />
            Email: <code style={{ color: "var(--text-primary)", background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 4 }}>admin@nexus.io</code>{" "}
            Password: <code style={{ color: "var(--text-primary)", background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 4 }}>admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
