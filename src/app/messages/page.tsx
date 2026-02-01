"use client";
import { useState, useEffect, useRef } from "react";
import { PageShell } from "@/components/PageShell";

interface Message { from: string; text: string; time: string; mine: boolean; }
interface Conversation {
  id: number; contact: string; avatar: string; unread: number; lastTime: string;
  pinned: boolean; lastMessage: string; messages: Message[];
}
interface MessagesData { conversations: Conversation[]; unreadCount: number; }

export default function MessagesPage() {
  const [data, setData] = useState<MessagesData | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [compose, setCompose] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/messages").then(r => r.ok ? r.json() : null).then(d => { if (d) { setData(d); setActiveId(d.conversations[0]?.id ?? null); } });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, localMessages]);

  if (!data) {
    return (
      <PageShell title="Messages" subtitle="Team conversations &amp; notifications">
        {() => <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 60, textAlign: "center" }}>Loading messages…</div>}
      </PageShell>
    );
  }

  const active = data.conversations.find(c => c.id === activeId);
  const currentMessages = active ? (localMessages[active.id] || active.messages) : [];

  const pinned = data.conversations.filter(c => c.pinned);
  const unpinned = data.conversations.filter(c => !c.pinned);
  const filteredConvos = search
    ? data.conversations.filter(c => c.contact.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase()))
    : [...pinned, ...unpinned];

  const sendMessage = () => {
    if (!compose.trim() || !active) return;
    const newMsg: Message = { from: "You", text: compose.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), mine: true };
    setLocalMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] || active.messages), newMsg] }));
    setCompose("");
  };

  return (
    <PageShell title="Messages" subtitle={`${data.unreadCount} unread conversation${data.unreadCount !== 1 ? "s" : ""}`}>
      {() => (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, height: "calc(100vh - 140px)" }}>
          {/* Conversation list */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Search */}
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "8px 12px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…" style={{ background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, fontFamily: "var(--font-family-body)" }} />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, padding: "0 16px 12px", marginBottom: 4 }}>
              {[{ label: "All", count: data.conversations.length }, { label: "Pinned", count: pinned.length }, { label: "Unread", count: data.unreadCount }].map(tab => (
                <span key={tab.label} style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--bg-input)", borderRadius: 6, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                  {tab.label}
                  {tab.count > 0 && <span style={{ background: "rgba(6,182,212,0.2)", color: "var(--accent-cyan)", fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "1px 6px" }}>{tab.count}</span>}
                </span>
              ))}
            </div>

            {/* Threads */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 8px" }}>
              {filteredConvos.map(c => {
                const isActive = c.id === activeId;
                return (
                  <div key={c.id} onClick={() => setActiveId(c.id)} style={{
                    display: "flex", gap: 10, padding: "10px 10px", borderRadius: 10, cursor: "pointer", marginBottom: 2,
                    background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                    border: isActive ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget).style.background = "rgba(255,255,255,0.03)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget).style.background = "transparent"; }}
                  >
                    {/* Avatar */}
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${c.id * 50}, 60%, 45%), hsl(${c.id * 50 + 70}, 50%, 35%))`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{c.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: c.unread > 0 ? 600 : 500 }}>
                          {c.contact} {c.pinned && <span style={{ fontSize: 10 }}>📌</span>}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: 10.5 }}>{c.lastTime}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                        <span style={{ color: "var(--text-muted)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{c.lastMessage}</span>
                        {c.unread > 0 && <span style={{ background: "var(--accent-cyan)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "2px 7px", flexShrink: 0 }}>{c.unread}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat panel */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {active ? (
              <>
                {/* Chat header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border-color)", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${active.id * 50}, 60%, 45%), hsl(${active.id * 50 + 70}, 50%, 35%))`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>{active.avatar}</div>
                    <div>
                      <div style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600 }}>{active.contact}</div>
                      <div style={{ color: "var(--accent-emerald)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-emerald)", display: "inline-block" }} />Online
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-muted)", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)" }}>📎</button>
                    <button style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-muted)", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)" }}>⋮</button>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {currentMessages.map((msg, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: msg.mine ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "72%" }}>
                        {!msg.mine && i > 0 && currentMessages[i-1].mine && (
                          <span style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 4, display: "block" }}>{msg.from}</span>
                        )}
                        <div style={{
                          background: msg.mine ? "linear-gradient(135deg, var(--accent-cyan), #0891b2)" : "rgba(30,45,77,0.5)",
                          color: msg.mine ? "#fff" : "var(--text-primary)",
                          borderRadius: msg.mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          padding: "10px 14px", fontSize: 13.5, lineHeight: 1.5,
                        }}>{msg.text}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 10.5, marginTop: 4, textAlign: msg.mine ? "right" : "left", paddingLeft: 2 }}>{msg.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Compose */}
                <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border-color)", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "10px 14px", transition: "border-color 0.25s, box-shadow 0.25s" }}
                    onFocus={e => { (e.currentTarget).style.borderColor = "var(--accent-cyan)"; (e.currentTarget).style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)"; }}
                    onBlur={e => { (e.currentTarget).style.borderColor = "var(--border-color)"; (e.currentTarget).style.boxShadow = "none"; }}
                  >
                    <span style={{ color: "var(--text-muted)", fontSize: 18, cursor: "pointer" }}>😊</span>
                    <input
                      value={compose}
                      onChange={e => setCompose(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                      placeholder={`Message ${active.contact}…`}
                      style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-family-body)" }}
                    />
                    <span style={{ color: "var(--text-muted)", fontSize: 16, cursor: "pointer" }}>📎</span>
                    <button onClick={sendMessage} style={{
                      background: compose.trim() ? "linear-gradient(135deg, var(--accent-cyan), #0891b2)" : "var(--bg-card)",
                      border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      color: compose.trim() ? "#fff" : "var(--text-muted)", fontSize: 16, cursor: compose.trim() ? "pointer" : "default", transition: "all 0.2s",
                    }}>▶</button>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 10.5, margin: "6px 0 0", textAlign: "center" }}>Press Enter to send · Shift+Enter for new line</p>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 15 }}>Select a conversation</div>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
