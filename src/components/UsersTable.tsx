"use client";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

interface UsersTableProps {
  users: User[];
}

const statusColors: Record<string, { bg: string; dot: string }> = {
  Active: { bg: "rgba(16,185,129,0.1)", dot: "#10b981" },
  Idle: { bg: "rgba(245,158,11,0.1)", dot: "#f59e0b" },
  Away: { bg: "rgba(139,92,246,0.1)", dot: "#8b5cf6" },
};

const roleColors: Record<string, string> = {
  Admin: "rgba(6,182,212,0.15)",
  Analyst: "rgba(139,92,246,0.15)",
  Viewer: "rgba(16,185,129,0.12)",
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="glass-card" style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Recent Users</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>{users.length} members online</p>
        </div>
        <button style={{
          background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)",
          color: "var(--accent-cyan)", borderRadius: 8, padding: "5px 12px", fontSize: 12,
          cursor: "pointer", fontFamily: "var(--font-family-body)",
        }}>View All</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", maxHeight: 280 }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.8fr 1fr 0.8fr 1fr",
          padding: "0 0 10px", borderBottom: "1px solid var(--border-color)", marginBottom: 4,
        }}>
          {["Name", "Role", "Status", "Last Active"].map((h) => (
            <span key={h} style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {users.map((user) => {
          const sc = statusColors[user.status] || statusColors.Active;
          return (
            <div key={user.id} style={{
              display: "grid", gridTemplateColumns: "1.8fr 1fr 0.8fr 1fr",
              alignItems: "center", padding: "10px 0",
              borderBottom: "1px solid rgba(30,45,77,0.4)",
              transition: "background 0.15s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(6,182,212,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Name + avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: `linear-gradient(135deg, hsl(${user.id * 37}, 60%, 45%), hsl(${user.id * 37 + 60}, 50%, 35%))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 600, flexShrink: 0,
                }}>
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{user.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{user.email}</div>
                </div>
              </div>

              {/* Role */}
              <span style={{
                display: "inline-block", background: roleColors[user.role] || roleColors.Viewer,
                color: "var(--text-secondary)", fontSize: 11, fontWeight: 500,
                padding: "3px 8px", borderRadius: 5,
              }}>{user.role}</span>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: sc.dot, display: "inline-block", boxShadow: `0 0 6px ${sc.dot}` }} />
                <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{user.status}</span>
              </div>

              {/* Last Active */}
              <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{user.lastActive}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
