"use client";
import { useState, useEffect, useMemo } from "react";
import { PageShell } from "@/components/PageShell";

interface UserItem {
  id: number; name: string; email: string; role: string; department: string;
  status: string; joined: string; lastActive: string; activity: number; avatar: string;
}
interface UsersData {
  users: UserItem[];
  departments: { name: string; count: number; color: string }[];
  totalUsers: number;
  activeUsers: number;
}

const statusStyle: Record<string, { bg: string; dot: string }> = {
  Active:  { bg: "rgba(16,185,129,0.1)",  dot: "#10b981" },
  Idle:    { bg: "rgba(245,158,11,0.1)",  dot: "#f59e0b" },
  Away:    { bg: "rgba(139,92,246,0.1)",  dot: "#8b5cf6" },
};

const roleColor: Record<string, string> = {
  Admin: "rgba(6,182,212,0.15)",
  Analyst: "rgba(139,92,246,0.15)",
  Viewer: "rgba(16,185,129,0.12)",
};

export default function UsersPage() {
  const [data, setData] = useState<UsersData | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState<"name" | "activity" | "role">("activity");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetch("/api/users").then(r => r.ok ? r.json() : null).then(d => d && setData(d));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = [...data.users];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q));
    }
    if (filterRole !== "All") list = list.filter(u => u.role === filterRole);
    if (filterStatus !== "All") list = list.filter(u => u.status === filterStatus);
    list.sort((a, b) => {
      const aVal = sortField === "name" ? a.name : sortField === "activity" ? a.activity : a.role;
      const bVal = sortField === "name" ? b.name : sortField === "activity" ? b.activity : b.role;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [data, search, filterRole, filterStatus, sortField, sortDir]);

  const toggleSort = (field: "name" | "activity" | "role") => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  return (
    <PageShell title="Users" subtitle="Manage team members, roles &amp; permissions">
      {() => {
        if (!data) return <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 60, textAlign: "center" }}>Loading users…</div>;

        // KPIs
        const idleCount = data.users.filter(u => u.status === "Idle").length;
        const avgActivity = Math.round(data.users.reduce((s, u) => s + u.activity, 0) / data.users.length);
        const kpis = [
          { label: "Total Members", value: data.totalUsers, icon: "👥", color: "var(--accent-cyan)" },
          { label: "Active Now", value: data.activeUsers, icon: "✅", color: "var(--accent-emerald)" },
          { label: "Idle / Away", value: idleCount + data.users.filter(u => u.status === "Away").length, icon: "⏳", color: "var(--accent-amber)" },
          { label: "Avg Activity", value: `${avgActivity}%`, icon: "📈", color: "var(--accent-violet)" },
        ];

        return (
          <>
            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
              {kpis.map(k => (
                <div key={k.label} className="glass-card" style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{k.label}</span>
                    <span style={{ fontSize: 20 }}>{k.icon}</span>
                  </div>
                  <span style={{ color: k.color, fontSize: 26, fontWeight: 700, fontFamily: "var(--font-family-display)" }}>{k.value}</span>
                </div>
              ))}
            </div>

            {/* Departments + Table side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
              {/* Department sidebar */}
              <div className="glass-card" style={{ padding: "22px 20px" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Departments</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {data.departments.map(dept => (
                    <div key={dept.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: dept.color, display: "inline-block" }} />
                          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{dept.name}</span>
                        </div>
                        <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 600 }}>{dept.count}</span>
                      </div>
                      <div style={{ height: 4, background: "var(--bg-input)", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${(dept.count / data.totalUsers) * 100}%`, background: dept.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Role filter */}
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--border-color)" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 10 }}>Filter by Role</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["All","Admin","Analyst","Viewer"].map(r => (
                      <button key={r} onClick={() => setFilterRole(r)} style={{
                        background: filterRole === r ? "rgba(6,182,212,0.1)" : "transparent",
                        border: filterRole === r ? "1px solid rgba(6,182,212,0.25)" : "1px solid transparent",
                        color: filterRole === r ? "var(--accent-cyan)" : "var(--text-secondary)",
                        borderRadius: 8, padding: "7px 12px", fontSize: 13, cursor: "pointer",
                        textAlign: "left", fontFamily: "var(--font-family-body)", transition: "all 0.2s",
                      }}>{r}</button>
                    ))}
                  </div>
                </div>

                {/* Status filter */}
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--border-color)" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 10 }}>Filter by Status</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["All","Active","Idle","Away"].map(s => (
                      <button key={s} onClick={() => setFilterStatus(s)} style={{
                        background: filterStatus === s ? "rgba(6,182,212,0.1)" : "transparent",
                        border: filterStatus === s ? "1px solid rgba(6,182,212,0.25)" : "1px solid transparent",
                        color: filterStatus === s ? "var(--accent-cyan)" : "var(--text-secondary)",
                        borderRadius: 8, padding: "7px 12px", fontSize: 13, cursor: "pointer",
                        textAlign: "left", fontFamily: "var(--font-family-body)", transition: "all 0.2s",
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main table */}
              <div className="glass-card" style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
                {/* Search + actions bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "8px 14px", width: 280 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 15 }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…" style={{ background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, fontFamily: "var(--font-family-body)" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", color: "var(--accent-cyan)", borderRadius: 8, padding: "7px 16px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)" }}>+ Invite User</button>
                    <button style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", borderRadius: 8, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)" }}>Export</button>
                  </div>
                </div>

                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 0.8fr 0.9fr", gap: "0 10px", paddingBottom: 10, borderBottom: "1px solid var(--border-color)" }}>
                  {(["Member","Department","Role","Status","Activity"] as const).map(col => {
                    const sortKey = col === "Member" ? "name" : col === "Activity" ? "activity" : col === "Role" ? "role" : null;
                    const active = sortField === sortKey;
                    return (
                      <div key={col} onClick={() => sortKey && toggleSort(sortKey)} style={{ color: active ? "var(--accent-cyan)" : "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, cursor: sortKey ? "pointer" : "default", userSelect: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        {col}
                        {active && <span style={{ fontSize: 9 }}>{sortDir === "asc" ? "▲" : "▼"}</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Rows */}
                <div style={{ flex: 1, overflowY: "auto", maxHeight: 420 }}>
                  {filtered.map(u => {
                    const sc = statusStyle[u.status] || statusStyle.Active;
                    return (
                      <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 0.8fr 0.9fr", gap: "0 10px", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.35)", transition: "background 0.15s" }}
                        onMouseEnter={e => (e.currentTarget).style.background = "rgba(6,182,212,0.03)"}
                        onMouseLeave={e => (e.currentTarget).style.background = "transparent"}
                      >
                        {/* Member */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${u.id * 37}, 60%, 45%), hsl(${u.id * 37 + 60}, 50%, 35%))`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{u.avatar}</div>
                          <div>
                            <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{u.name}</div>
                            <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{u.email}</div>
                          </div>
                        </div>
                        {/* Department */}
                        <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{u.department}</span>
                        {/* Role */}
                        <span style={{ display: "inline-block", background: roleColor[u.role], color: "var(--text-secondary)", fontSize: 11.5, fontWeight: 500, padding: "3px 9px", borderRadius: 6 }}>{u.role}</span>
                        {/* Status */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: sc.dot, boxShadow: `0 0 6px ${sc.dot}`, display: "inline-block" }} />
                          <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{u.status}</span>
                        </div>
                        {/* Activity */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 5, background: "var(--bg-input)", borderRadius: 3 }}>
                            <div style={{ height: "100%", width: `${u.activity}%`, background: u.activity >= 70 ? "var(--accent-emerald)" : u.activity >= 40 ? "var(--accent-amber)" : "var(--accent-rose)", borderRadius: 3 }} />
                          </div>
                          <span style={{ color: "var(--text-muted)", fontSize: 11, width: 30, textAlign: "right", flexShrink: 0 }}>{u.activity}%</span>
                        </div>
                      </div>
                    );
                  })}
                  {filtered.length === 0 && (
                    <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, padding: "40px 0" }}>No users match your filters</div>
                  )}
                </div>
                {/* Footer */}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Showing {filtered.length} of {data.totalUsers} members</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Last updated: just now</span>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </PageShell>
  );
}
