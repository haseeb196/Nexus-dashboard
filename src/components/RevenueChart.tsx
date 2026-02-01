"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number; visitors: number; conversions: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "rgba(17,24,39,0.95)", border: "1px solid var(--border-color)",
      borderRadius: 10, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    }}>
      <p style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color, display: "inline-block" }} />
            {entry.name}
          </span>
          <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600 }}>
            {entry.name === "Revenue" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Revenue & Engagement</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>12-month performance overview</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { color: "var(--accent-cyan)", label: "Revenue" },
            { color: "var(--accent-emerald)", label: "Visitors" },
            { color: "var(--accent-violet)", label: "Conversions" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color, display: "inline-block" }} />
              <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,77,0.5)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#4a5a80", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4a5a80", fontSize: 11 }} tickFormatter={(v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#06b6d4" strokeWidth={2} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#10b981" strokeWidth={2} fill="url(#colorVisitors)" />
          <Area type="monotone" dataKey="conversions" name="Conversions" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorConversions)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
