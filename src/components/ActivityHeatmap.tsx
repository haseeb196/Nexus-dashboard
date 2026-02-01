"use client";
import { useState } from "react";

interface ActivityHeatmapProps {
  data: number[][];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => (i === 0 ? "12a" : i < 12 ? `${i}a` : i === 12 ? "12p" : `${i - 12}p`));

function getColor(value: number, max: number): string {
  const ratio = value / max;
  if (ratio < 0.2) return "rgba(6,182,212,0.08)";
  if (ratio < 0.4) return "rgba(6,182,212,0.2)";
  if (ratio < 0.6) return "rgba(6,182,212,0.38)";
  if (ratio < 0.8) return "rgba(6,182,212,0.58)";
  return "rgba(6,182,212,0.85)";
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ day: string; hour: string; value: number; x: number; y: number } | null>(null);
  const max = Math.max(...data.flat());

  // Only show every 3rd hour label to avoid clutter
  const showLabel = (i: number) => i % 3 === 0;

  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Activity Heatmap</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>User activity across the week (hourly)</p>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex" }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginRight: 8, paddingTop: 18 }}>
            {DAYS.map((d) => (
              <div key={d} style={{ height: 22, display: "flex", alignItems: "center", color: "var(--text-muted)", fontSize: 10.5, width: 28, textAlign: "right", paddingRight: 6 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ flex: 1, overflowX: "auto" }}>
            {/* Hour labels */}
            <div style={{ display: "flex", gap: 2, marginBottom: 4, paddingLeft: 0 }}>
              {HOURS.map((h, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", color: "var(--text-muted)", fontSize: 9, minWidth: 18 }}>
                  {showLabel(i) ? h : ""}
                </div>
              ))}
            </div>
            {/* Rows */}
            {data.map((row, dayIdx) => (
              <div key={dayIdx} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {row.map((val, hourIdx) => (
                  <div
                    key={hourIdx}
                    style={{
                      flex: 1, aspectRatio: "1", borderRadius: 4, minWidth: 18,
                      background: getColor(val, max),
                      cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = "scale(1.15)";
                      (e.target as HTMLElement).style.boxShadow = "0 0 8px rgba(6,182,212,0.4)";
                      setTooltip({ day: DAYS[dayIdx], hour: HOURS[hourIdx], value: val, x: 0, y: 0 });
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = "scale(1)";
                      (e.target as HTMLElement).style.boxShadow = "none";
                      setTooltip(null);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div style={{
            position: "fixed", pointerEvents: "none", zIndex: 999,
            background: "rgba(17,24,39,0.95)", border: "1px solid var(--border-color)",
            borderRadius: 8, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            left: "50%", bottom: 8, transform: "translateX(-50%)",
          }}>
            <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600 }}>
              {tooltip.day} @ {tooltip.hour}
            </span>
            <span style={{ color: "var(--accent-cyan)", fontSize: 12, marginLeft: 10 }}>
              {tooltip.value} users
            </span>
          </div>
        )}

        {/* Legend bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 10 }}>Low</span>
          <div style={{ display: "flex", gap: 2 }}>
            {[0.08, 0.2, 0.38, 0.58, 0.85].map((o, i) => (
              <div key={i} style={{ width: 20, height: 10, borderRadius: 2, background: `rgba(6,182,212,${o})` }} />
            ))}
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: 10 }}>High</span>
        </div>
      </div>
    </div>
  );
}
