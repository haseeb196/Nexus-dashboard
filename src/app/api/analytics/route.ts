import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-server";

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generateAnalytics() {
  const rand = seededRandom(97);

  // ─── 1. Conversion Funnel ───
  const funnel = [
    { stage: "Landed", value: 24800 },
    { stage: "Signed Up", value: 18400 },
    { stage: "Onboarded", value: 11200 },
    { stage: "Activated", value: 6800 },
    { stage: "Converted", value: 3200 },
  ];

  // ─── 2. Cohort Retention (%) — 6 cohorts × 6 weeks ───
  const cohortLabels = ["Jan '25","Feb '25","Mar '25","Apr '25","May '25","Jun '25"];
  const cohortRetention: number[][] = cohortLabels.map((_, ci) =>
    Array.from({ length: 6 - ci }, (_, wi) => {
      const base = wi === 0 ? 100 : 100 - wi * 16;
      return Math.max(8, Math.round(base + (rand() - 0.5) * 12));
    })
  );

  // ─── 3. Geographic breakdown ───
  const geoData = [
    { country: "United States", visitors: 38200, flag: "🇺🇸", pct: 31.2 },
    { country: "United Kingdom", visitors: 12800, flag: "🇬🇧", pct: 10.5 },
    { country: "Germany", visitors: 9400, flag: "🇩🇪", pct: 7.7 },
    { country: "India", visitors: 8900, flag: "🇮🇳", pct: 7.3 },
    { country: "Canada", visitors: 7200, flag: "🇨🇦", pct: 5.9 },
    { country: "Australia", visitors: 5800, flag: "🇦🇺", pct: 4.7 },
    { country: "France", visitors: 4600, flag: "🇫🇷", pct: 3.8 },
    { country: "Japan", visitors: 3900, flag: "🇯🇵", pct: 3.2 },
  ];

  // ─── 4. Device split ───
  const devices = [
    { type: "Desktop", pct: 52, icon: "🖥️", color: "#06b6d4" },
    { type: "Mobile", pct: 36, icon: "📱", color: "#8b5cf6" },
    { type: "Tablet", pct: 12, icon: "📲", color: "#10b981" },
  ];

  // ─── 5. Page performance table ───
  const pages = [
    { path: "/home", views: 48200, avgTime: "2m 34s", bounce: 32.1, trend: 4.2 },
    { path: "/pricing", views: 31600, avgTime: "3m 12s", bounce: 41.8, trend: -1.5 },
    { path: "/features", views: 24800, avgTime: "4m 08s", bounce: 28.4, trend: 6.7 },
    { path: "/blog/getting-started", views: 18900, avgTime: "5m 45s", bounce: 22.0, trend: 9.1 },
    { path: "/signup", views: 14200, avgTime: "1m 52s", bounce: 55.3, trend: -3.8 },
    { path: "/dashboard", views: 11800, avgTime: "8m 20s", bounce: 12.6, trend: 2.3 },
    { path: "/docs/api", views: 9400, avgTime: "6m 15s", bounce: 18.9, trend: 5.0 },
  ];

  // ─── 6. Sessions over time (daily last 30 days) ───
  const sessionData = Array.from({ length: 30 }, (_, i) => {
    const base = 1800 + Math.sin(i * 0.4) * 400;
    const weekend = (i % 7 >= 5) ? 0.6 : 1;
    return {
      day: i + 1,
      sessions: Math.round((base + (rand() - 0.45) * 500) * weekend),
      pageViews: Math.round((base * 3.2 + (rand() - 0.4) * 800) * weekend),
    };
  });

  // ─── 7. Top referrers ───
  const referrers = [
    { source: "google.com", visits: 18400, newUsers: 12200 },
    { source: "twitter.com", visits: 7800, newUsers: 5100 },
    { source: "github.com", visits: 5600, newUsers: 4200 },
    { source: "producthunt.com", visits: 4100, newUsers: 3600 },
    { source: "hackernews.com", visits: 3200, newUsers: 2800 },
  ];

  return { funnel, cohortLabels, cohortRetention, geoData, devices, pages, sessionData, referrers };
}

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(generateAnalytics());
}
