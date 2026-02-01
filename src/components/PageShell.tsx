"use client";
import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useDashboard } from "@/lib/useDashboard";

interface PageShellProps {
  title: string;
  subtitle: string;
  children: (user: { name: string; email: string; role: string }) => ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  const { user, loading, handleLogout } = useDashboard();

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ width: 44, height: 44, border: "3px solid var(--border-color)", borderTopColor: "var(--accent-cyan)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar user={user} onLogout={handleLogout} title={title} subtitle={subtitle} />
        <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          {children(user)}
        </main>
      </div>
    </div>
  );
}
