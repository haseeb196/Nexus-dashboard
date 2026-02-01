"use client";
import { useState, useEffect, useMemo } from "react";
import { PageShell } from "@/components/PageShell";

interface Product {
  id: number; name: string; category: string; price: number; revenue: number;
  sales: number; status: string; stock: number; trend: number; rating: number; description: string;
}
interface ProductsData {
  products: Product[];
  categories: { name: string; count: number; revenue: number; color: string }[];
  totalRevenue: number; totalSales: number; totalProducts: number;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  Active:       { bg: "rgba(16,185,129,0.12)",  text: "#10b981" },
  "Low Stock":  { bg: "rgba(245,158,11,0.12)",  text: "#f59e0b" },
  Discontinued: { bg: "rgba(244,63,94,0.12)",   text: "#f43f5e" },
};

export default function ProductsPage() {
  const [data, setData] = useState<ProductsData | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<"revenue" | "sales" | "trend" | "price">("revenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetch("/api/products").then(r => r.ok ? r.json() : null).then(d => d && setData(d));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = [...data.products];
    if (search) { const q = search.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
    if (catFilter !== "All") list = list.filter(p => p.category === catFilter);
    if (statusFilter !== "All") list = list.filter(p => p.status === statusFilter);
    list.sort((a, b) => {
      const diff = (a as any)[sortField] - (b as any)[sortField];
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [data, search, catFilter, statusFilter, sortField, sortDir]);

  const toggleSort = (f: "revenue" | "sales" | "trend" | "price") => {
    if (sortField === f) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(f); setSortDir("desc"); }
  };

  return (
    <PageShell title="Products" subtitle="Manage your product catalog, pricing &amp; performance">
      {() => {
        if (!data) return <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 60, textAlign: "center" }}>Loading products…</div>;

        const maxRevenue = Math.max(...data.products.map(p => p.revenue));
        const avgRating = (data.products.reduce((s, p) => s + p.rating, 0) / data.products.length).toFixed(1);

        // KPIs
        const kpis = [
          { label: "Total Products", value: data.totalProducts, icon: "📦", color: "var(--accent-cyan)" },
          { label: "Total Revenue", value: `$${(data.totalRevenue / 1000).toFixed(0)}K`, icon: "💰", color: "var(--accent-emerald)" },
          { label: "Total Sales", value: data.totalSales.toLocaleString(), icon: "🎯", color: "var(--accent-violet)" },
          { label: "Avg Rating", value: `${avgRating}★`, icon: "⭐", color: "var(--accent-amber)" },
        ];

        return (
          <>
            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
              {kpis.map(k => (
                <div key={k.label} className="glass-card" style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{k.label}</span>
                    <span style={{ fontSize: 20 }}>{k.icon}</span>
                  </div>
                  <span style={{ color: k.color, fontSize: 26, fontWeight: 700, fontFamily: "var(--font-family-display)" }}>{k.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
              {/* Category sidebar */}
              <div className="glass-card" style={{ padding: "22px 20px" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Categories</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {["All", ...data.categories.map(c => c.name)].map(cat => {
                    const active = catFilter === cat;
                    const catData = data.categories.find(c => c.name === cat);
                    return (
                      <button key={cat} onClick={() => setCatFilter(cat)} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: active ? "rgba(6,182,212,0.1)" : "transparent",
                        border: active ? "1px solid rgba(6,182,212,0.25)" : "1px solid transparent",
                        color: active ? "var(--accent-cyan)" : "var(--text-secondary)",
                        borderRadius: 8, padding: "8px 12px", fontSize: 13, cursor: "pointer",
                        textAlign: "left", fontFamily: "var(--font-family-body)", transition: "all 0.2s", width: "100%",
                      }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {catData && <span style={{ width: 8, height: 8, borderRadius: "50%", background: catData.color, display: "inline-block" }} />}
                          {cat}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{catData ? catData.count : data.totalProducts}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Category revenue breakdown */}
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-color)" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 12 }}>Revenue Share</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.categories.map(c => (
                      <div key={c.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ color: "var(--text-secondary)", fontSize: 11.5 }}>{c.name}</span>
                          <span style={{ color: "var(--text-muted)", fontSize: 11 }}>${(c.revenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div style={{ height: 4, background: "var(--bg-input)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${(c.revenue / data.totalRevenue) * 100}%`, background: c.color, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status filter */}
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-color)" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 10 }}>Status</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["All","Active","Low Stock","Discontinued"].map(s => {
                      const active = statusFilter === s;
                      return (
                        <button key={s} onClick={() => setStatusFilter(s)} style={{
                          background: active ? "rgba(6,182,212,0.1)" : "transparent",
                          border: active ? "1px solid rgba(6,182,212,0.25)" : "1px solid transparent",
                          color: active ? "var(--accent-cyan)" : "var(--text-secondary)",
                          borderRadius: 8, padding: "7px 12px", fontSize: 13, cursor: "pointer",
                          textAlign: "left", fontFamily: "var(--font-family-body)", transition: "all 0.2s", width: "100%",
                        }}>{s}</button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Top bar */}
                <div className="glass-card" style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "8px 14px", width: 260 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 15 }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, fontFamily: "var(--font-family-body)" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Sort */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {(["revenue","sales","price","trend"] as const).map(f => (
                        <button key={f} onClick={() => toggleSort(f)} style={{
                          background: sortField === f ? "rgba(6,182,212,0.12)" : "transparent",
                          border: sortField === f ? "1px solid rgba(6,182,212,0.3)" : "1px solid var(--border-color)",
                          color: sortField === f ? "var(--accent-cyan)" : "var(--text-muted)",
                          borderRadius: 6, padding: "5px 10px", fontSize: 11.5, cursor: "pointer", fontFamily: "var(--font-family-body)", textTransform: "capitalize",
                        }}>{f} {sortField === f ? (sortDir === "desc" ? "▼" : "▲") : ""}</button>
                      ))}
                    </div>
                    {/* View toggle */}
                    <div style={{ display: "flex", background: "var(--bg-input)", borderRadius: 8, padding: 3 }}>
                      {[{ v: "grid" as const, icon: "⊞" }, { v: "list" as const, icon: "☰" }].map(({ v, icon }) => (
                        <button key={v} onClick={() => setView(v)} style={{
                          background: view === v ? "var(--bg-card)" : "transparent", border: "none",
                          color: view === v ? "var(--text-primary)" : "var(--text-muted)",
                          borderRadius: 6, padding: "4px 10px", fontSize: 14, cursor: "pointer", transition: "all 0.2s",
                        }}>{icon}</button>
                      ))}
                    </div>
                    <button style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", color: "var(--accent-cyan)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)" }}>+ Add Product</button>
                  </div>
                </div>

                {/* Products */}
                {view === "grid" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                    {filtered.map(p => {
                      const sc = statusColors[p.status] || statusColors.Active;
                      return (
                        <div key={p.id} className="glass-card" style={{ padding: "20px", cursor: "pointer" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div>
                              <h4 style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, margin: 0 }}>{p.name}</h4>
                              <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "4px 0 0" }}>{p.description}</p>
                            </div>
                            <span style={{ background: sc.bg, color: sc.text, fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.status}</span>
                          </div>
                          {/* Stats row */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <span style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-family-display)" }}>${p.price}</span>
                            <div style={{ display: "flex", gap: 12 }}>
                              <div style={{ textAlign: "center" }}>
                                <div style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sales</div>
                                <div style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 600 }}>{p.sales}</div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <div style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Rating</div>
                                <div style={{ color: "var(--accent-amber)", fontSize: 13, fontWeight: 600 }}>{p.rating}★</div>
                              </div>
                            </div>
                          </div>
                          {/* Revenue bar */}
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <span style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Revenue</span>
                              <span style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>${(p.revenue / 1000).toFixed(1)}K</span>
                            </div>
                            <div style={{ height: 5, background: "var(--bg-input)", borderRadius: 3 }}>
                              <div style={{ height: "100%", width: `${(p.revenue / maxRevenue) * 100}%`, background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))", borderRadius: 3 }} />
                            </div>
                          </div>
                          {/* Trend */}
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ color: p.trend >= 0 ? "var(--accent-emerald)" : "var(--accent-rose)", fontSize: 12, fontWeight: 600 }}>
                              {p.trend >= 0 ? "▲" : "▼"} {Math.abs(p.trend)}%
                            </span>
                            <span style={{ color: "var(--text-muted)", fontSize: 11 }}>vs last month</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* List view */
                  <div className="glass-card" style={{ padding: "0" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2.5fr 0.7fr 0.8fr 0.7fr 0.6fr 0.7fr", gap: "0 10px", padding: "12px 20px", borderBottom: "1px solid var(--border-color)" }}>
                      {["Product","Price","Revenue","Sales","Trend","Status"].map(h => <span key={h} style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{h}</span>)}
                    </div>
                    {filtered.map(p => {
                      const sc = statusColors[p.status] || statusColors.Active;
                      return (
                        <div key={p.id} style={{ display: "grid", gridTemplateColumns: "2.5fr 0.7fr 0.8fr 0.7fr 0.6fr 0.7fr", gap: "0 10px", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(30,45,77,0.35)", transition: "background 0.15s", cursor: "pointer" }}
                          onMouseEnter={e => (e.currentTarget).style.background = "rgba(6,182,212,0.03)"}
                          onMouseLeave={e => (e.currentTarget).style.background = "transparent"}
                        >
                          <div>
                            <div style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                            <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{p.category} · {p.rating}★</div>
                          </div>
                          <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600 }}>${p.price}</span>
                          <div>
                            <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 600 }}>${(p.revenue / 1000).toFixed(1)}K</span>
                            <div style={{ height: 3, background: "var(--bg-input)", borderRadius: 2, marginTop: 4 }}>
                              <div style={{ height: "100%", width: `${(p.revenue / maxRevenue) * 100}%`, background: "var(--accent-cyan)", borderRadius: 2 }} />
                            </div>
                          </div>
                          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{p.sales}</span>
                          <span style={{ color: p.trend >= 0 ? "var(--accent-emerald)" : "var(--accent-rose)", fontSize: 13, fontWeight: 600 }}>{p.trend >= 0 ? "▲" : "▼"}{Math.abs(p.trend)}%</span>
                          <span style={{ background: sc.bg, color: sc.text, fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 5 }}>{p.status}</span>
                        </div>
                      );
                    })}
                    {filtered.length === 0 && <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, padding: "40px 0" }}>No products match your filters</div>}
                  </div>
                )}
                <div style={{ color: "var(--text-muted)", fontSize: 12, textAlign: "right" }}>Showing {filtered.length} of {data.totalProducts} products</div>
              </div>
            </div>
          </>
        );
      }}
    </PageShell>
  );
}
