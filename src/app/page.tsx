"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkAuth().then((ok) => router.push(ok ? "/dashboard" : "/login"));
  }, [router]);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: 48, height: 48, border: "3px solid var(--border-color)", borderTopColor: "var(--accent-cyan)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
