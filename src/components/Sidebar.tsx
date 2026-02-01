"use client";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { icon: "📊", label: "Overview", href: "/dashboard" },
  { icon: "📈", label: "Analytics", href: "/analytics" },
  { icon: "👥", label: "Users", href: "/users" },
  { icon: "📦", label: "Products", href: "/products" },
  { icon: "💬", label: "Messages", href: "/messages", badge: 3 },
  { icon: "⚙️", label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside style={{
      width: 240,
      background: "rgba(10,14,26,0.95)",
      borderRight: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      backdropFilter: "blur(8px)",
    }}>
      {/* Brand */}
      <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="url(#g2)" />
            <path d="M10 22L18 10L26 22H10Z" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" fill="none" opacity="0.9"/>
            <circle cx="18" cy="22" r="3" fill="#06b6d4"/>
            <defs><linearGradient id="g2" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#0f172a"/><stop offset="1" stopColor="#1e293b"/></linearGradient></defs>
          </svg>
          <span style={{ fontFamily: "var(--font-family-display)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>Nexus</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <div
              key={item.label}
              onClick={() => router.push(item.href)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                background: active ? "rgba(6,182,212,0.1)" : "transparent",
                border: active ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget).style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget).style.background = "transparent"; }}
            >
              <span style={{ fontSize: 18, width: 22, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontSize: 13.5, color: active ? "var(--accent-cyan)" : "var(--text-secondary)", fontWeight: active ? 600 : 400, flex: 1 }}>
                {item.label}
              </span>
              {item.badge && (
                <span style={{ background: "var(--accent-rose)", color: "#fff", fontSize: 11, fontWeight: 600, borderRadius: 10, padding: "2px 7px" }}>
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer usage */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Storage</span>
          <span style={{ color: "var(--text-secondary)", fontSize: 11 }}>2.4 / 10 GB</span>
        </div>
        <div style={{ height: 4, background: "var(--bg-input)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: "24%", background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))", borderRadius: 2 }} />
        </div>
      </div>
    </aside>
  );
}
