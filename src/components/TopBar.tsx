"use client";

interface TopBarProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  title?: string;
  subtitle?: string;
}

export function TopBar({ user, onLogout, title = "Dashboard Overview", subtitle }: TopBarProps) {
  const initials = user ? user.name.split(" ").map((n: string) => n[0]).join("") : "?";
  const defaultSubtitle = `Welcome back, ${user?.name} — here's what's happening`;

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 28px", borderBottom: "1px solid var(--border-color)",
      background: "rgba(10,14,26,0.8)", backdropFilter: "blur(8px)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-family-display)", fontSize: 20, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
          {title}
        </h1>
      <p
  style={{
    color: "var(--text-muted)",
    fontSize: 12.5,
    margin: "2px 0 0",
  }}
  dangerouslySetInnerHTML={{
    __html:
      subtitle ||
      defaultSubtitle.replace(
        user?.name || "",
        `<strong style="color:var(--text-secondary)">${user?.name || ""}</strong>`
      ),
  }}
/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Search pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 20, padding: "7px 14px", cursor: "pointer" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Search…</span>
        </div>
        {/* Avatar + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 700,
          }}>{initials}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{user?.name}</span>
            <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{user?.role}</span>
          </div>
          <button onClick={onLogout} style={{
            marginLeft: 8, background: "none", border: "1px solid var(--border-color)", color: "var(--text-muted)",
            borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", transition: "all 0.2s",
            fontFamily: "var(--font-family-body)",
          }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.borderColor = "var(--accent-rose)"; (e.target as HTMLButtonElement).style.color = "var(--accent-rose)"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.borderColor = "var(--border-color)"; (e.target as HTMLButtonElement).style.color = "var(--text-muted)"; }}
          >Logout</button>
        </div>
      </div>
    </header>
  );
}
