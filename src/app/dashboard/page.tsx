"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, logoutUser } from "@/lib/auth-client";
import { KPICard } from "@/components/KPICard";
import { RevenueChart } from "@/components/RevenueChart";
import { TrafficPie } from "@/components/TrafficPie";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { UsersTable } from "@/components/UsersTable";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

interface Stats {
  kpis: Array<{ label: string; value: string; change: number; trend: string }>;
  revenueData: Array<{ month: string; revenue: number; visitors: number; conversions: number }>;
  trafficSources: Array<{ name: string; value: number; color: string }>;
  activityHeatmap: number[][];
  recentUsers: Array<{ id: number; name: string; email: string; role: string; status: string; lastActive: string }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (!me) { router.push("/login"); return; }
      setUser(me.user);
      const res = await fetch("/api/stats");
      if (res.ok) setStats(await res.json());
      setLoading(false);
    })();
  }, [router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ width: 44, height: 44, border: "3px solid var(--border-color)", borderTopColor: "var(--accent-cyan)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar user={user} onLogout={handleLogout} />
        <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          {/* KPI Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            {stats.kpis.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}
          </div>

          {/* Charts Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
            <RevenueChart data={stats.revenueData} />
            <TrafficPie data={stats.trafficSources} />
          </div>

          {/* Charts Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <ActivityHeatmap data={stats.activityHeatmap} />
            <UsersTable users={stats.recentUsers} />
          </div>
        </main>
      </div>
    </div>
  );
}
