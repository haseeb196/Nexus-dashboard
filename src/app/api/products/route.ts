import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-server";

const products = [
  { id: 1, name: "Nexus Pro", category: "Software", price: 149, revenue: 82400, sales: 553, status: "Active", stock: 0, trend: 12.4, rating: 4.8, description: "Enterprise analytics suite" },
  { id: 2, name: "DataFlow Engine", category: "Software", price: 299, revenue: 64200, sales: 215, status: "Active", stock: 0, trend: 8.1, rating: 4.6, description: "Real-time data pipeline tool" },
  { id: 3, name: "Nexus Starter", category: "Software", price: 49, revenue: 41800, sales: 853, status: "Active", stock: 0, trend: -2.3, rating: 4.5, description: "Entry-level analytics package" },
  { id: 4, name: "API Gateway", category: "Infrastructure", price: 199, revenue: 38600, sales: 194, status: "Active", stock: 0, trend: 5.7, rating: 4.7, description: "Managed API gateway service" },
  { id: 5, name: "Cloud Storage Pack", category: "Infrastructure", price: 79, revenue: 29400, sales: 372, status: "Active", stock: 0, trend: 3.2, rating: 4.4, description: "Scalable cloud storage solution" },
  { id: 6, name: "Security Shield", category: "Security", price: 249, revenue: 24800, sales: 100, status: "Active", stock: 0, trend: 15.8, rating: 4.9, description: "Advanced threat protection" },
  { id: 7, name: "DevOps Toolkit", category: "Tools", price: 129, revenue: 18600, sales: 144, status: "Low Stock", stock: 12, trend: -1.1, rating: 4.3, description: "CI/CD and deployment tools" },
  { id: 8, name: "Monitoring Hub", category: "Infrastructure", price: 179, revenue: 14200, sales: 79, status: "Active", stock: 0, trend: 9.4, rating: 4.6, description: "System health monitoring" },
  { id: 9, name: "Auth Connect", category: "Security", price: 99, revenue: 11800, sales: 119, status: "Low Stock", stock: 5, trend: -4.2, rating: 4.2, description: "SSO and identity management" },
  { id: 10, name: "Analytics Add-on", category: "Software", price: 69, revenue: 8900, sales: 129, status: "Discontinued", stock: 0, trend: -18.6, rating: 3.9, description: "Legacy analytics extension" },
];

const categories = [
  { name: "Software", count: 4, revenue: 208400, color: "#06b6d4" },
  { name: "Infrastructure", count: 3, revenue: 82200, color: "#8b5cf6" },
  { name: "Security", count: 2, revenue: 36600, color: "#10b981" },
  { name: "Tools", count: 1, revenue: 18600, color: "#f59e0b" },
];

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);
  return NextResponse.json({ products, categories, totalRevenue, totalSales, totalProducts: products.length });
}
