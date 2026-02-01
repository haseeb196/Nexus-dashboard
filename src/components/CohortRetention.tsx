"use client";
import { useState } from "react";

interface CohortRetentionProps {
  labels: string[];
  data: number[][];
}

function cellColor(value: number): string {
  if (value >= 90) return "rgba(16,185,129,0.85)";
  if (value >= 70) return "rgba(16,185,129,0.55)";
  if (value >= 50) return "rgba(6,182,212,0.45)";
  if (value >= 30) return "rgba(139,92,246,0.4)";
  if (value >= 15) return "rgba(245,158,11,0.35)";
  return "rgba(244,63,94,0.3)";
}

function cellText(value: number): string {
  if (value >= 60) return "#fff";
  return "var(--text-primary)";
}

export function CohortRetention({ labels, data }: CohortRetentionProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);
  const weekLabels = ["W0","W1","W2","W3","W4","W5"];

  return (
    <div className="glass-card" style={{ padding: "22px 24px" }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>Cohort Retention</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 0" }}>Weekly retention by signup cohort</p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 3 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "6px 10px 6px 0", color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                Cohort
              </th>
              {weekLabels.map((w) => (
                <th key={w} style={{ textAlign: "center", padding: "6px 4px", color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, minWidth: 50 }}>
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, rowIdx) => (
              <tr key={label}>
                <td style={{ padding: "5px 10px 5px 0", color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
                  {label}
                </td>
                {weekLabels.map((_, colIdx) => {
                  const val = data[rowIdx]?.[colIdx];
                  const isHovered = hovered?.row === rowIdx && hovered?.col === colIdx;
                  return (
                    <td key={colIdx} style={{ textAlign: "center", padding: "3px 2px" }}>
                      {val !== undefined ? (
                        <div
                          onMouseEnter={() => setHovered({ row: rowIdx, col: colIdx })}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            background: cellColor(val),
                            borderRadius: 6,
                            padding: "7px 4px",
                            color: cellText(val),
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "default",
                            transition: "transform 0.15s, box-shadow 0.15s",
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                            boxShadow: isHovered ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
                            position: "relative",
                          }}
                        >
                          {val}%
                        </div>
                      ) : (
                        <div style={{ height: 34, borderRadius: 6, background: "rgba(30,45,77,0.15)" }} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>Low</span>
        {[
          "rgba(244,63,94,0.3)",
          "rgba(245,158,11,0.35)",
          "rgba(139,92,246,0.4)",
          "rgba(6,182,212,0.45)",
          "rgba(16,185,129,0.55)",
          "rgba(16,185,129,0.85)",
        ].map((c, i) => (
          <div key={i} style={{ width: 24, height: 16, borderRadius: 3, background: c }} />
        ))}
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>High</span>
      </div>
    </div>
  );
}
