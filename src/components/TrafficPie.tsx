"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TrafficPieProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(17,24,39,0.95)", border: "1px solid var(--border-color)",
      borderRadius: 8, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    }}>
      <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600 }}>{d.name}</span>
      <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: 8 }}>{d.value}%</span>
    </div>
  );
};

export function TrafficPie({ data }: TrafficPieProps) {
  return (
    <div className="glass-card" style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Traffic Sources</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>Where visitors come from</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 0 }}>
        <div style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} stroke="none">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ color: "var(--text-primary)", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-family-display)" }}>100%</span>
            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Total</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingLeft: 12 }}>
          {data.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{item.name}</span>
              </div>
              <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600 }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
