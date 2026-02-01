import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-server";

// ─── Deterministic pseudo-random (seeded) ───
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generateStats() {
  const rand = seededRandom(42);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Revenue & visitors over 12 months
  const revenueData = months.map((month, i) => {
    const base = 30000 + i * 4500;
    return {
      month,
      revenue: Math.round(base + (rand() - 0.3) * 12000),
      visitors: Math.round(8000 + i * 1200 + (rand() - 0.4) * 3000),
      conversions: Math.round(1200 + i * 200 + (rand() - 0.35) * 600),
    };
  });

  // Traffic sources (pie)
  const trafficSources = [
    { name: "Organic Search", value: 38, color: "#06b6d4" },
    { name: "Direct", value: 25, color: "#8b5cf6" },
    { name: "Social Media", value: 18, color: "#10b981" },
    { name: "Referral", value: 12, color: "#f59e0b" },
    { name: "Email", value: 7, color: "#f43f5e" },
  ];

  // Weekly active hours heatmap (7 days × 24 hours)
  const activityHeatmap = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => {
      const peak = hour >= 9 && hour <= 17 ? 1 : 0.3;
      const weekend = day >= 5 ? 0.5 : 1;
      return Math.round((rand() * 60 + 10) * peak * weekend);
    })
  );

  // Recent users table
  const names = ["Sofia Chen","Raj Patel","Emma Wilson","Lucas Martin","Aisha Khan","Noah Davis","Mia Thompson","Oliver Wright","Zara Ali","Ethan Clark"];
  const roles = ["Admin","Analyst","Viewer"];
  const statuses = ["Active","Active","Active","Idle","Active","Away"];
  const recentUsers = names.map((name, i) => ({
    id: i + 1,
    name,
    email: `${name.split(" ")[0].toLowerCase()}@nexus.io`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    lastActive: `${Math.floor(rand() * 60)} min ago`,
  }));

  // KPI cards
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalVisitors = revenueData.reduce((s, d) => s + d.visitors, 0);
  const totalConversions = revenueData.reduce((s, d) => s + d.conversions, 0);
  const conversionRate = ((totalConversions / totalVisitors) * 100).toFixed(1);

  return {
    kpis: [
      { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: 12.5, trend: "up" },
      { label: "Total Visitors", value: `${(totalVisitors / 1000).toFixed(0)}K`, change: 8.2, trend: "up" },
      { label: "Conversions", value: `${(totalConversions / 1000).toFixed(1)}K`, change: -2.1, trend: "down" },
      { label: "Conv. Rate", value: `${conversionRate}%`, change: 0.4, trend: "up" },
    ],
    revenueData,
    trafficSources,
    activityHeatmap,
    recentUsers,
  };
}

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(generateStats());
}
