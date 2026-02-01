"use client";

interface FunnelStage { stage: string; value: number; }
interface FunnelChartProps { data: FunnelStage[]; }

const COLORS = ["#06b6d4","#0891b2","#0e7490","#155e75","#164e63"];

export function FunnelChart({ data }: FunnelChartProps) {
  const max = data[0]?.value ?? 1;

  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Conversion Funnel</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>User journey from landing to conversion</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {data.map((item, i) => {
          const widthPct = (item.value / max) * 100;
          const dropoff = i > 0 ? (((data[i - 1].value - item.value) / data[i - 1].value) * 100).toFixed(1) : null;

          return (
            <div key={item.stage}>
              {/* Drop-off indicator */}
              {dropoff && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ color: "var(--accent-rose)", fontSize: 11, fontWeight: 600 }}>▼ {dropoff}% drop-off</span>
                  </div>
                </div>
              )}

              {/* Bar row */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Label */}
                <div style={{ width: 90, textAlign: "right", flexShrink: 0 }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}>{item.stage}</span>
                </div>

                {/* Bar */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 38, background: "var(--bg-input)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                    <div style={{
                      height: "100%",
                      width: `${widthPct}%`,
                      background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}cc)`,
                      borderRadius: 8,
                      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {widthPct > 18 && (
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{item.value.toLocaleString()}</span>
                      )}
                    </div>
                    {widthPct <= 18 && (
                      <span style={{ position: "absolute", left: `calc(${widthPct}% + 8px)`, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {/* Percentage of total */}
                  <span style={{ color: "var(--text-muted)", fontSize: 11, width: 42, textAlign: "right", flexShrink: 0 }}>
                    {((item.value / max) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
          Overall conversion rate
        </span>
        <span style={{ color: "var(--accent-emerald)", fontSize: 14, fontWeight: 700 }}>
          {((data[data.length - 1]?.value / max) * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
