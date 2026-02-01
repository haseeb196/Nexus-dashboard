"use client";

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  trend: string;
}

const icons: Record<string, string> = {
  "Total Revenue": "💰",
  "Total Visitors": "👁️",
  "Conversions": "🎯",
  "Conv. Rate": "📊",
};

export function KPICard({ label, value, change, trend }: KPICardProps) {
  const isUp = trend === "up";
  return (
    <div className="glass-card" style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
      {/* Decorative gradient corner */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        borderRadius: "50%", background: isUp ? "rgba(16,185,129,0.08)" : "rgba(244,63,94,0.08)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontSize: 20 }}>{icons[label] || "📈"}</span>
      </div>

      <div style={{ fontSize: 26, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-family-display)", marginBottom: 10 }}>
        {value}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          background: isUp ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)",
          color: isUp ? "var(--accent-emerald)" : "var(--accent-rose)",
          fontSize: 12, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
        }}>
          {isUp ? "▲" : "▼"} {Math.abs(change)}%
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: 11.5 }}>vs last month</span>
      </div>
    </div>
  );
}
