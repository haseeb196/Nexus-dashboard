import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-server";

const users = [
  { id: 1, name: "Sofia Chen", email: "sofia@nexus.io", role: "Admin", department: "Engineering", status: "Active", joined: "Jan 12, 2024", lastActive: "2 min ago", activity: 94, avatar: "SC" },
  { id: 2, name: "Raj Patel", email: "raj@nexus.io", role: "Analyst", department: "Data Science", status: "Active", joined: "Feb 3, 2024", lastActive: "15 min ago", activity: 82, avatar: "RP" },
  { id: 3, name: "Emma Wilson", email: "emma@nexus.io", role: "Viewer", department: "Marketing", status: "Active", joined: "Feb 18, 2024", lastActive: "1 hr ago", activity: 71, avatar: "EW" },
  { id: 4, name: "Lucas Martin", email: "lucas@nexus.io", role: "Analyst", department: "Engineering", status: "Idle", joined: "Mar 7, 2024", lastActive: "3 hrs ago", activity: 58, avatar: "LM" },
  { id: 5, name: "Aisha Khan", email: "aisha@nexus.io", role: "Admin", department: "Product", status: "Active", joined: "Mar 22, 2024", lastActive: "5 min ago", activity: 91, avatar: "AK" },
  { id: 6, name: "Noah Davis", email: "noah@nexus.io", role: "Viewer", department: "Sales", status: "Away", joined: "Apr 10, 2024", lastActive: "2 days ago", activity: 34, avatar: "ND" },
  { id: 7, name: "Mia Thompson", email: "mia@nexus.io", role: "Analyst", department: "Data Science", status: "Active", joined: "Apr 28, 2024", lastActive: "8 min ago", activity: 78, avatar: "MT" },
  { id: 8, name: "Oliver Wright", email: "oliver@nexus.io", role: "Viewer", department: "Marketing", status: "Active", joined: "May 15, 2024", lastActive: "42 min ago", activity: 65, avatar: "OW" },
  { id: 9, name: "Zara Ali", email: "zara@nexus.io", role: "Analyst", department: "Product", status: "Idle", joined: "Jun 2, 2024", lastActive: "4 hrs ago", activity: 47, avatar: "ZA" },
  { id: 10, name: "Ethan Clark", email: "ethan@nexus.io", role: "Viewer", department: "Sales", status: "Active", joined: "Jun 19, 2024", lastActive: "20 min ago", activity: 72, avatar: "EC" },
  { id: 11, name: "Priya Sharma", email: "priya@nexus.io", role: "Analyst", department: "Engineering", status: "Active", joined: "Jul 8, 2024", lastActive: "1 min ago", activity: 88, avatar: "PS" },
  { id: 12, name: "James Lee", email: "james@nexus.io", role: "Viewer", department: "Sales", status: "Away", joined: "Jul 25, 2024", lastActive: "1 week ago", activity: 21, avatar: "JL" },
];

const departments = [
  { name: "Engineering", count: 3, color: "#06b6d4" },
  { name: "Data Science", count: 2, color: "#8b5cf6" },
  { name: "Marketing", count: 2, color: "#10b981" },
  { name: "Product", count: 2, color: "#f59e0b" },
  { name: "Sales", count: 3, color: "#f43f5e" },
];

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ users, departments, totalUsers: users.length, activeUsers: users.filter(u => u.status === "Active").length });
}
