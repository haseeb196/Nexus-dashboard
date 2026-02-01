"use client";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsData {
  funnel: { stage: string; value: number }[];
  cohortLabels: string[];
  cohortRetention: number[][];
  geoData: { country: string; visitors: number; flag: string; pct: number }[];
  devices: { type: string; pct: number; icon: string; color: string }[];
  pages: { path: string; views: number; avgTime: string; bounce: number; trend: number }[];
  sessionData: { day: number; sessions: number; pageViews: number }[];
  referrers: { source: string; visits: number; newUsers: number }[];
}

// ─── Sub-components ───

function FunnelChart({ data }: { data: AnalyticsData["funnel"] }) {
  const max = data[0]?.value ?? 1;
  const colors = ["#06b6d4","#0891b2","#0e7490","#155e75","#164e63"];
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Conversion Funnel</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 20px" }}>User journey from landing to conversion</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {data.map((item, i) => {
          const widthPct = (item.value / max) * 100;
          const dropoff = i > 0 ? (((data[i-1].value - item.value) / data[i-1].value) * 100).toFixed(1) : null;
          return (
            <div key={item.stage}>
              {dropoff && (
                <div style={{ textAlign: "center", padding: "4px 0" }}>
                  <span style={{ color: "var(--accent-rose)", fontSize: 11, fontWeight: 600 }}>▼ {dropoff}% drop-off</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 82, textAlign: "right", flexShrink: 0 }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}>{item.stage}</span>
                </div>
                <div style={{ flex: 1, height: 36, background: "var(--bg-input)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: `${widthPct}%`, background: colors[i], borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                    {widthPct > 20 && <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{item.value.toLocaleString()}</span>}
                  </div>
                  {widthPct <= 20 && <span style={{ position: "absolute", left: `calc(${widthPct}% + 8px)`, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>{item.value.toLocaleString()}</span>}
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: 11, width: 38, textAlign: "right", flexShrink: 0 }}>{widthPct.toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Overall conversion rate</span>
        <span style={{ color: "var(--accent-emerald)", fontSize: 14, fontWeight: 700 }}>{((data[data.length-1]?.value / max) * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
}

function CohortRetention({ labels, data }: { labels: string[]; data: number[][] }) {
  const weeks = ["W0","W1","W2","W3","W4","W5"];
  const cellBg = (v: number) => v >= 90 ? "rgba(16,185,129,0.8)" : v >= 70 ? "rgba(16,185,129,0.5)" : v >= 50 ? "rgba(6,182,212,0.4)" : v >= 30 ? "rgba(139,92,246,0.38)" : v >= 15 ? "rgba(245,158,11,0.33)" : "rgba(244,63,94,0.28)";
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Cohort Retention</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 18px" }}>Weekly retention by signup cohort</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 3 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "5px 8px 5px 0", color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Cohort</th>
              {weeks.map(w => <th key={w} style={{ textAlign: "center", padding: "5px 3px", color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, minWidth: 46 }}>{w}</th>)}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, ri) => (
              <tr key={label}>
                <td style={{ padding: "4px 8px 4px 0", color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}>{label}</td>
                {weeks.map((_, ci) => {
                  const val = data[ri]?.[ci];
                  return (
                    <td key={ci} style={{ textAlign: "center", padding: "3px 2px" }}>
                      {val !== undefined ? (
                        <div style={{ background: cellBg(val), borderRadius: 6, padding: "6px 2px", color: val >= 55 ? "#fff" : "var(--text-primary)", fontSize: 12, fontWeight: 600 }}>{val}%</div>
                      ) : (
                        <div style={{ height: 32, borderRadius: 6, background: "rgba(30,45,77,0.15)" }} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginTop: 14 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>Low</span>
        {["rgba(244,63,94,0.28)","rgba(245,158,11,0.33)","rgba(139,92,246,0.38)","rgba(6,182,212,0.4)","rgba(16,185,129,0.5)","rgba(16,185,129,0.8)"].map((c,i) => <div key={i} style={{ width: 22, height: 14, borderRadius: 3, background: c }} />)}
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>High</span>
      </div>
    </div>
  );
}

function GeoTable({ data }: { data: AnalyticsData["geoData"] }) {
  const maxV = data[0]?.visitors ?? 1;
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Top Countries</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 18px" }}>Visitor geographic distribution</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.map((item, i) => (
          <div key={item.country}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{item.flag}</span>
                <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{item.country}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{item.visitors.toLocaleString()}</span>
                <span style={{ color: "var(--accent-cyan)", fontSize: 12, fontWeight: 600, width: 40, textAlign: "right" }}>{item.pct}%</span>
              </div>
            </div>
            <div style={{ height: 5, background: "var(--bg-input)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${(item.visitors / maxV) * 100}%`, background: `hsl(${190 - i * 18}, 70%, 50%)`, borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceCard({ data }: { data: AnalyticsData["devices"] }) {
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Devices</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 20px" }}>Platform breakdown</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.map((d) => (
          <div key={d.type}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{d.icon}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{d.type}</span>
              </div>
              <span style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 700 }}>{d.pct}%</span>
            </div>
            <div style={{ height: 8, background: "var(--bg-input)", borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${d.pct}%`, background: d.color, borderRadius: 4, transition: "width 0.6s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionChart({ data }: { data: AnalyticsData["sessionData"] }) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div style={{ background: "rgba(17,24,39,0.95)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 11, marginBottom: 6, fontWeight: 600 }}>Day {label}</p>
        {payload.map((e: any, i: number) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
            <span style={{ color: "var(--text-muted)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, display: "inline-block" }} />{e.name}
            </span>
            <span style={{ color: "var(--text-primary)", fontSize: 12, fontWeight: 600 }}>{e.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Sessions & Page Views</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 16px" }}>Last 30 days daily activity</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colSess" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="100%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
            <linearGradient id="colPV" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,77,0.5)" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#4a5a80", fontSize: 10 }} interval={4} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4a5a80", fontSize: 10 }} tickFormatter={(v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#8b5cf6" strokeWidth={2} fill="url(#colPV)" />
          <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#06b6d4" strokeWidth={2} fill="url(#colSess)" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 20, marginTop: 12, justifyContent: "center" }}>
        {[{ color: "#06b6d4", label: "Sessions" }, { color: "#8b5cf6", label: "Page Views" }].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color, display: "inline-block" }} />
            <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PagePerformance({ data }: { data: AnalyticsData["pages"] }) {
  const maxViews = data[0]?.views ?? 1;
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Page Performance</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 16px" }}>Views, engagement & bounce rate by page</p>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 0.8fr 0.7fr 0.6fr", gap: "0 12px" }}>
        {["Page","Views","Avg Time","Bounce","Trend"].map(h => (
          <div key={h} style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, paddingBottom: 10, borderBottom: "1px solid var(--border-color)" }}>{h}</div>
        ))}
        {data.map((p) => (
          <>
            <div key={p.path + "path"} style={{ padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--text-primary)", fontSize: 13, fontFamily: "var(--font-family-mono)", fontWeight: 500 }}>{p.path}</span>
            </div>
            <div key={p.path + "views"} style={{ padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: "var(--bg-input)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${(p.views / maxViews) * 100}%`, background: "var(--accent-cyan)", borderRadius: 2 }} />
              </div>
              <span style={{ color: "var(--text-secondary)", fontSize: 12, flexShrink: 0 }}>{(p.views / 1000).toFixed(1)}k</span>
            </div>
            <div key={p.path + "time"} style={{ padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.4)", color: "var(--text-secondary)", fontSize: 12 }}>{p.avgTime}</div>
            <div key={p.path + "bounce"} style={{ padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
              <span style={{ color: p.bounce > 40 ? "var(--accent-rose)" : p.bounce > 25 ? "var(--accent-amber)" : "var(--accent-emerald)", fontSize: 12, fontWeight: 600 }}>{p.bounce}%</span>
            </div>
            <div key={p.path + "trend"} style={{ padding: "11px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
              <span style={{ color: p.trend >= 0 ? "var(--accent-emerald)" : "var(--accent-rose)", fontSize: 12, fontWeight: 600 }}>
                {p.trend >= 0 ? "▲" : "▼"} {Math.abs(p.trend)}%
              </span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

function ReferrerTable({ data }: { data: AnalyticsData["referrers"] }) {
  const maxV = data[0]?.visits ?? 1;
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Top Referrers</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 0 16px" }}>Inbound traffic sources</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 0.7fr 0.7fr", gap: "0 12px", paddingBottom: 10, borderBottom: "1px solid var(--border-color)" }}>
          {["Source","Visits","New Users"].map(h => <span key={h} style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{h}</span>)}
        </div>
        {data.map((r) => (
          <div key={r.source} style={{ display: "grid", gridTemplateColumns: "1.8fr 0.7fr 0.7fr", gap: "0 12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌐</div>
              <div>
                <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{r.source}</div>
                <div style={{ height: 3, background: "var(--bg-input)", borderRadius: 2, marginTop: 4, width: 80 }}>
                  <div style={{ height: "100%", width: `${(r.visits / maxV) * 100}%`, background: "var(--accent-violet)", borderRadius: 2 }} />
                </div>
              </div>
            </div>
            <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 500 }}>{r.visits.toLocaleString()}</span>
            <span style={{ color: "var(--accent-emerald)", fontSize: 13, fontWeight: 600 }}>{r.newUsers.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/analytics").then(r => r.ok ? r.json() : null).then(d => d && setData(d));
  }, []);

  return (
    <PageShell title="Analytics" subtitle="Deep-dive into visitor behaviour, retention &amp; engagement">
      {() => {
        if (!data) return <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 60, textAlign: "center" }}>Loading analytics…</div>;
        return (
          <>
            {/* Row 1: Funnel + Cohort */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 16, marginBottom: 16 }}>
              <FunnelChart data={data.funnel} />
              <CohortRetention labels={data.cohortLabels} data={data.cohortRetention} />
            </div>
            {/* Row 2: Geo + Devices + Session chart */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 1.3fr", gap: 16, marginBottom: 16 }}>
              <GeoTable data={data.geoData} />
              <DeviceCard data={data.devices} />
              <SessionChart data={data.sessionData} />
            </div>
            {/* Row 3: Page perf + Referrers */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <PagePerformance data={data.pages} />
              <ReferrerTable data={data.referrers} />
            </div>
          </>
        );
      }}
    </PageShell>
  );
}
