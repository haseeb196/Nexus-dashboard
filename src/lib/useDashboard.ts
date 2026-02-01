"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, logoutUser } from "@/lib/auth-client";

export function useDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (!me) { router.push("/login"); return; }
      setUser(me.user);
      setLoading(false);
    })();
  }, [router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return { user, loading, handleLogout };
}
