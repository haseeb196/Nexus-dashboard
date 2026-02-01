import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "Nexus Dashboard",
  description: "Real-time analytics & business intelligence",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="bg-grid" />
        <div className="glow-orb glow-orb--cyan" />
        <div className="glow-orb glow-orb--violet" />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
