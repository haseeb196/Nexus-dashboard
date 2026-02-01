"use client";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

// ─── Reusable micro-components ───

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 12, cursor: "pointer", position: "relative",
      background: on ? "var(--accent-cyan)" : "var(--bg-input)",
      border: on ? "none" : "1px solid var(--border-color)",
      transition: "background 0.25s, box-shadow 0.25s",
      boxShadow: on ? "0 0 10px rgba(6,182,212,0.35)" : "none",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: on ? 23 : 3,
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "var(--font-family-display)" }}>{title}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12.5, margin: "4px 0 0" }}>{desc}</p>
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
      <div style={{ flex: 1, paddingRight: 24 }}>
        <div style={{ color: "var(--text-primary)", fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function DangerButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", color: "var(--accent-rose)",
      borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)", transition: "all 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget).style.background = "rgba(244,63,94,0.18)"; }}
      onMouseLeave={e => { (e.currentTarget).style.background = "rgba(244,63,94,0.1)"; }}
    >{label}</button>
  );
}

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: "linear-gradient(135deg, var(--accent-cyan), #0891b2)", border: "none", color: "#fff",
      borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)",
      fontWeight: 500, transition: "transform 0.15s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget).style.boxShadow = "0 4px 16px rgba(6,182,212,0.35)"; (e.currentTarget).style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget).style.boxShadow = "none"; (e.currentTarget).style.transform = "translateY(0)"; }}
    >{label}</button>
  );
}

function Toast({ msg }: { msg: string }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 100,
      background: "rgba(17,24,39,0.95)", border: "1px solid var(--accent-emerald)", borderRadius: 10,
      padding: "10px 20px", color: "var(--accent-emerald)", fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 8,
      animation: "slideUp 0.3s ease",
    }}>
      <span>✓</span> {msg}
      <style>{`@keyframes slideUp { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

// ─── Tab sections ───

const TABS = [
  { id: "profile",       label: "Profile",       icon: "👤" },
  { id: "appearance",    label: "Appearance",    icon: "🎨" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "security",      label: "Security",      icon: "🔒" },
  { id: "api",           label: "API Keys",      icon: "🔑" },
];

function ProfileTab({ user }: { user: { name: string; email: string; role: string } }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState("Product engineer & data enthusiast. Building Nexus since day one.");
  const [timezone, setTimezone] = useState("UTC-5 (Eastern)");
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {saved && <Toast msg="Profile updated successfully" />}

      {/* Left: avatar + bio */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <SectionHeader title="Your Profile" desc="Update your personal information and avatar" />

        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28, padding: "20px 0" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 96, height: 96, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "var(--font-family-display)",
              border: "3px solid var(--bg-base)", boxShadow: "0 0 24px rgba(6,182,212,0.3)",
            }}>{initials}</div>
            <div style={{
              position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%",
              background: "var(--accent-emerald)", border: "3px solid var(--bg-base)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
            }}>✓</div>
          </div>
          <button style={{
            marginTop: 14, background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-secondary)",
            borderRadius: 8, padding: "6px 16px", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-family-body)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget).style.borderColor = "var(--accent-cyan)"; (e.currentTarget).style.color = "var(--accent-cyan)"; }}
            onMouseLeave={e => { (e.currentTarget).style.borderColor = "var(--border-color)"; (e.currentTarget).style.color = "var(--text-secondary)"; }}
          >Upload Photo</button>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6 }}>Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{
            width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)",
            borderRadius: 10, padding: "10px 14px", fontSize: 13, fontFamily: "var(--font-family-body)", resize: "none", outline: "none",
            transition: "border-color 0.25s",
          }}
            onFocus={e => (e.currentTarget).style.borderColor = "var(--accent-cyan)"}
            onBlur={e => (e.currentTarget).style.borderColor = "var(--border-color)"}
          />
        </div>

        {/* Role badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Role</span>
          <span style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent-cyan)", fontSize: 11.5, fontWeight: 600, padding: "3px 10px", borderRadius: 6 }}>{user.role}</span>
          <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: 8 }}>· Member since Jan 2024</span>
        </div>
      </div>

      {/* Right: fields */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <SectionHeader title="Account Details" desc="Edit your name, email and preferences" />

        {[
          { label: "Full Name", value: name, setter: setName, placeholder: "Your full name" },
          { label: "Email Address", value: email, setter: setEmail, placeholder: "you@example.com" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
            <input value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} style={{
              width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)",
              borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontFamily: "var(--font-family-body)", outline: "none", transition: "border-color 0.25s, box-shadow 0.25s",
            }}
              onFocus={e => { (e.currentTarget).style.borderColor = "var(--accent-cyan)"; (e.currentTarget).style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)"; }}
              onBlur={e => { (e.currentTarget).style.borderColor = "var(--border-color)"; (e.currentTarget).style.boxShadow = "none"; }}
            />
          </div>
        ))}

        {/* Dropdowns as styled selects */}
        {[
          { label: "Timezone", value: timezone, options: ["UTC-5 (Eastern)", "UTC-8 (Pacific)", "UTC+0 (London)", "UTC+1 (Paris)", "UTC+5:30 (Kolkata)", "UTC+9 (Tokyo)"] },
          { label: "Language", value: language, options: ["English", "Español", "Français", "Deutsch", "日本語"] },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
            <select value={f.value} onChange={e => f.label === "Timezone" ? setTimezone(e.target.value) : setLanguage(e.target.value)} style={{
              width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)",
              borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontFamily: "var(--font-family-body)", outline: "none",
              appearance: "none", cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%234a5a80'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
            }}>
              {f.options.map(o => <option key={o} value={o} style={{ background: "#111827", color: "#f0f2f5" }}>{o}</option>)}
            </select>
          </div>
        ))}

        <div style={{ marginTop: 28 }}>
          <PrimaryButton label="Save Changes" onClick={save} />
        </div>
      </div>
    </div>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("cyan");
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const accents = [
    { id: "cyan",    color: "#06b6d4", label: "Cyan" },
    { id: "violet", color: "#8b5cf6", label: "Violet" },
    { id: "emerald",color: "#10b981", label: "Emerald" },
    { id: "rose",   color: "#f43f5e", label: "Rose" },
    { id: "amber",  color: "#f59e0b", label: "Amber" },
  ];

  const themes = [
    { id: "dark",  label: "Dark", desc: "Easy on the eyes", bg: "#0a0e1a", accent: "#06b6d4" },
    { id: "darker", label: "Darker", desc: "Maximum contrast", bg: "#040610", accent: "#06b6d4" },
    { id: "midnight", label: "Midnight", desc: "Blue-tinted dark", bg: "#0a0f1f", accent: "#8b5cf6" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Theme picker */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <SectionHeader title="Theme" desc="Choose your preferred colour scheme" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {themes.map(t => {
            const active = theme === t.id;
            return (
              <div key={t.id} onClick={() => setTheme(t.id)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                background: active ? "rgba(6,182,212,0.08)" : "var(--bg-input)",
                border: active ? "1px solid rgba(6,182,212,0.35)" : "1px solid var(--border-color)",
                transition: "all 0.2s",
              }}>
                {/* Mini preview swatch */}
                <div style={{ width: 42, height: 32, borderRadius: 8, background: t.bg, border: "1px solid var(--border-color)", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 3, borderRadius: 2, background: t.accent }} />
                  <div style={{ position: "absolute", top: 14, left: 6, width: 20, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
                  <div style={{ position: "absolute", top: 20, left: 6, width: 16, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: active ? "var(--accent-cyan)" : "var(--text-primary)", fontSize: 13.5, fontWeight: 500 }}>{t.label}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>{t.desc}</div>
                </div>
                {active && <span style={{ color: "var(--accent-cyan)", fontSize: 16 }}>✓</span>}
              </div>
            );
          })}
        </div>

        {/* Accent colors */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-color)" }}>
          <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 12 }}>Accent Color</label>
          <div style={{ display: "flex", gap: 10 }}>
            {accents.map(a => {
              const active = accentColor === a.id;
              return (
                <div key={a.id} onClick={() => setAccentColor(a.id)} title={a.label} style={{
                  width: 34, height: 34, borderRadius: "50%", background: a.color, cursor: "pointer",
                  border: active ? `3px solid ${a.color}` : "3px solid transparent",
                  boxShadow: active ? `0 0 0 3px var(--bg-card), 0 0 0 5px ${a.color}` : `0 0 0 3px var(--bg-card)`,
                  transition: "all 0.2s",
                }} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Layout toggles */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <SectionHeader title="Layout & Motion" desc="Fine-tune your interface behaviour" />
        <SettingRow label="Compact Mode" desc="Reduce padding and spacing across the UI">
          <Toggle on={compactMode} onChange={() => setCompactMode(!compactMode)} />
        </SettingRow>
        <SettingRow label="Animations" desc="Enable micro-interactions and transitions">
          <Toggle on={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />
        </SettingRow>
        <SettingRow label="Collapse Sidebar" desc="Minimise sidebar to icon-only mode">
          <Toggle on={sidebarCollapsed} onChange={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </SettingRow>

        {/* Font size preview */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-color)" }}>
          <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 12 }}>Font Size Preview</label>
          <div style={{ background: "var(--bg-input)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ color: "var(--text-primary)", fontSize: 20, fontWeight: 600, fontFamily: "var(--font-family-display)", marginBottom: 6 }}>Nexus Dashboard</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 4 }}>The quick brown fox jumps over the lazy dog.</div>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>0123456789 — ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email: true, push: true, sms: false,
    newUser: true, newProduct: true, salesAlert: true, systemAlert: true,
    weeklyDigest: true, monthlyReport: false,
    sound: true, desktop: true,
  });
  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const channels = [
    { key: "email" as const, label: "Email", icon: "📧", desc: "Receive notifications via email" },
    { key: "push" as const, label: "Push", icon: "📲", desc: "Browser push notifications" },
    { key: "sms" as const, label: "SMS", icon: "💬", desc: "Text message alerts" },
  ];

  const events = [
    { key: "newUser" as const, label: "New User Signup", desc: "When a new user registers" },
    { key: "newProduct" as const, label: "Product Update", desc: "When a product status changes" },
    { key: "salesAlert" as const, label: "Sales Milestone", desc: "Revenue or sales thresholds hit" },
    { key: "systemAlert" as const, label: "System Alert", desc: "Errors, warnings & health issues" },
  ];

  const digests = [
    { key: "weeklyDigest" as const, label: "Weekly Digest", desc: "Summary every Monday morning" },
    { key: "monthlyReport" as const, label: "Monthly Report", desc: "Full analytics at month end" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Channels */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <SectionHeader title="Notification Channels" desc="Choose how you want to be notified" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {channels.map(ch => (
            <div key={ch.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: prefs[ch.key] ? "rgba(6,182,212,0.1)" : "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "background 0.2s", flexShrink: 0 }}>{ch.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text-primary)", fontSize: 13.5, fontWeight: 500 }}>{ch.label}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{ch.desc}</div>
              </div>
              <Toggle on={prefs[ch.key]} onChange={() => toggle(ch.key)} />
            </div>
          ))}
        </div>

        {/* Sound & Desktop */}
        <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border-color)" }}>
          <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 10 }}>Preferences</label>
          <SettingRow label="Notification Sound" desc="Play audio on new notification">
            <Toggle on={prefs.sound} onChange={() => toggle("sound")} />
          </SettingRow>
          <SettingRow label="Desktop Focus" desc="Show alerts while app is focused">
            <Toggle on={prefs.desktop} onChange={() => toggle("desktop")} />
          </SettingRow>
        </div>
      </div>

      {/* Events & Digests */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Event Alerts" desc="Control which activities trigger notifications" />
          {events.map(ev => (
            <SettingRow key={ev.key} label={ev.label} desc={ev.desc}>
              <Toggle on={prefs[ev.key]} onChange={() => toggle(ev.key)} />
            </SettingRow>
          ))}
        </div>

        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Digests & Reports" desc="Scheduled summary emails" />
          {digests.map(d => (
            <SettingRow key={d.key} label={d.label} desc={d.desc}>
              <Toggle on={prefs[d.key]} onChange={() => toggle(d.key)} />
            </SettingRow>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [twoFa, setTwoFa] = useState(false);
  const [sessions, setSessions] = useState(true);
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const activeSessions = [
    { device: "MacBook Pro 16\"", location: "Karachi, PK", ip: "203.0.113.45", lastSeen: "Now", current: true },
    { device: "iPhone 15 Pro", location: "Karachi, PK", ip: "203.0.113.46", lastSeen: "2 hrs ago", current: false },
    { device: "Chrome – Windows 11", location: "London, UK", ip: "198.51.100.12", lastSeen: "3 days ago", current: false },
  ];

  const auditLog = [
    { action: "Password changed", time: "Jan 28, 2025 · 3:14 PM", ip: "203.0.113.45", icon: "🔑" },
    { action: "New device login", time: "Jan 25, 2025 · 9:02 AM", ip: "198.51.100.12", icon: "📱" },
    { action: "Profile updated", time: "Jan 22, 2025 · 11:45 AM", ip: "203.0.113.45", icon: "✏️" },
    { action: "2FA enabled", time: "Jan 18, 2025 · 7:30 PM", ip: "203.0.113.45", icon: "🛡️" },
    { action: "Account created", time: "Jan 12, 2024 · 2:00 PM", ip: "10.0.0.1", icon: "🎉" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {saved && <Toast msg="Security settings saved" />}

      {/* Left col */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Password */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Password" desc="Keep your account secure with a strong password" />
          {["Current Password","New Password","Confirm New Password"].map(label => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
              <input type="password" placeholder="••••••••" style={{
                width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)",
                borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontFamily: "var(--font-family-body)", outline: "none", transition: "border-color 0.25s, box-shadow 0.25s",
              }}
                onFocus={e => { (e.currentTarget).style.borderColor = "var(--accent-cyan)"; (e.currentTarget).style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)"; }}
                onBlur={e => { (e.currentTarget).style.borderColor = "var(--border-color)"; (e.currentTarget).style.boxShadow = "none"; }}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <PrimaryButton label="Update Password" onClick={save} />
          </div>
        </div>

        {/* 2FA */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Two-Factor Authentication" desc="Add an extra layer of security" />
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: twoFa ? "rgba(16,185,129,0.12)" : "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text-primary)", fontSize: 13.5, fontWeight: 500 }}>Authenticator App</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Use Google Authenticator or Authy</div>
            </div>
            <Toggle on={twoFa} onChange={() => setTwoFa(!twoFa)} />
          </div>
          <div style={{ marginTop: 16 }}>
            <SettingRow label="Require 2FA on Login" desc="Always prompt for code">
              <Toggle on={sessions} onChange={() => setSessions(!sessions)} />
            </SettingRow>
          </div>
        </div>
      </div>

      {/* Right col */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Active Sessions */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "var(--font-family-display)" }}>Active Sessions</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 12.5, margin: "4px 0 0" }}>Manage where you're signed in</p>
            </div>
            <DangerButton label="Revoke All" onClick={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {activeSessions.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {s.device.includes("MacBook") ? "💻" : s.device.includes("iPhone") ? "📱" : "🖥️"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                    {s.device}
                    {s.current && <span style={{ background: "rgba(16,185,129,0.12)", color: "var(--accent-emerald)", fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Current</span>}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>{s.location} · {s.ip} · {s.lastSeen}</div>
                </div>
                {!s.current && <DangerButton label="Revoke" onClick={() => {}} />}
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Security Audit Log" desc="Recent security-related activity" />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {auditLog.map((entry, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < auditLog.length - 1 ? "1px solid rgba(30,45,77,0.4)" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{entry.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{entry.action}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{entry.time}</div>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: 10.5, fontFamily: "var(--font-family-mono)" }}>{entry.ip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiTab() {
  const [keys, setKeys] = useState([
    { id: 1, name: "Production", prefix: "sk_live_aB3k...", created: "Jan 12, 2025", lastUsed: "2 min ago", permissions: ["Read", "Write"], active: true },
    { id: 2, name: "Staging", prefix: "sk_test_xY9m...", created: "Dec 8, 2024", lastUsed: "1 hr ago", permissions: ["Read"], active: true },
    { id: 3, name: "Analytics Bot", prefix: "sk_live_mN2p...", created: "Nov 22, 2024", lastUsed: "5 days ago", permissions: ["Read"], active: false },
  ]);
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);

  const createKey = () => {
    if (!newName.trim()) return;
    setKeys(prev => [...prev, {
      id: prev.length + 1, name: newName.trim(),
      prefix: `sk_live_${Math.random().toString(36).slice(2, 6)}...`,
      created: "Jan 31, 2025", lastUsed: "Never", permissions: ["Read"], active: true,
    }]);
    setNewName("");
    setShowNew(false);
  };

  const revokeKey = (id: number) => setKeys(prev => prev.map(k => k.id === id ? { ...k, active: false } : k));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Keys list */}
      <div className="glass-card" style={{ padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h3 style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "var(--font-family-display)" }}>API Keys</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 12.5, margin: "4px 0 0" }}>Manage programmatic access</p>
          </div>
          <button onClick={() => setShowNew(!showNew)} style={{
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", color: "var(--accent-cyan)",
            borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-family-body)", transition: "all 0.2s",
          }}>+ New Key</button>
        </div>

        {/* Create form */}
        {showNew && (
          <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
            <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6 }}>Key Name</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && createKey()} placeholder="e.g. Mobile App" style={{
                flex: 1, background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)",
                borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: "var(--font-family-body)", outline: "none",
              }} />
              <PrimaryButton label="Create" onClick={createKey} />
              <button onClick={() => setShowNew(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 18, cursor: "pointer" }}>×</button>
            </div>
          </div>
        )}

        {/* Key rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {keys.map(k => (
            <div key={k.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "1px solid rgba(30,45,77,0.4)" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--text-primary)", fontSize: 13.5, fontWeight: 500 }}>{k.name}</span>
                  <span style={{
                    background: k.active ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)",
                    color: k.active ? "var(--accent-emerald)" : "var(--accent-rose)",
                    fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{k.active ? "Active" : "Revoked"}</span>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 11.5, fontFamily: "var(--font-family-mono)", marginTop: 3 }}>{k.prefix}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>Created {k.created} · Used {k.lastUsed}</div>
              </div>
              {k.active ? (
                <DangerButton label="Revoke" onClick={() => revokeKey(k.id)} />
              ) : (
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>Revoked</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: usage + docs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Usage stats */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="API Usage" desc="Last 30 days request metrics" />
          {[
            { label: "Total Requests", value: "284,120", color: "var(--accent-cyan)" },
            { label: "Successful (2xx)", value: "279,804", color: "var(--accent-emerald)" },
            { label: "Client Errors (4xx)", value: "3,892", color: "var(--accent-amber)" },
            { label: "Server Errors (5xx)", value: "424", color: "var(--accent-rose)" },
          ].map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? "1px solid rgba(30,45,77,0.4)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: stat.color, display: "inline-block" }} />
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{stat.label}</span>
              </div>
              <span style={{ color: stat.color, fontSize: 15, fontWeight: 700 }}>{stat.value}</span>
            </div>
          ))}

          {/* Mini bar chart */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
            <label style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 10 }}>Daily Requests (last 7d)</label>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
              {[62, 78, 55, 91, 84, 43, 72].map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${(v / 91) * 100}%`, background: `linear-gradient(180deg, var(--accent-cyan), var(--accent-violet))`, borderRadius: "4px 4px 0 0", transition: "height 0.4s ease" }} />
                  <span style={{ color: "var(--text-muted)", fontSize: 9.5 }}>
                    {["M","T","W","T","F","S","S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick docs */}
        <div className="glass-card" style={{ padding: "28px 24px" }}>
          <SectionHeader title="Quick Start" desc="Get up and running with the API" />
          <div style={{ background: "var(--bg-input)", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
            <div style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 8 }}>Base URL</div>
            <code style={{ color: "var(--accent-cyan)", fontSize: 13, fontFamily: "var(--font-family-mono)" }}>https://api.nexus.io/v1</code>
          </div>
          <div style={{ background: "var(--bg-input)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ color: "var(--text-muted)", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 8 }}>Example</div>
            <pre style={{ color: "var(--text-secondary)", fontSize: 12, fontFamily: "var(--font-family-mono)", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              <span style={{ color: "var(--accent-violet)" }}>curl</span> -H <span style={{ color: "var(--accent-amber)" }}>"Authorization: Bearer sk_live_..."</span>{"\n"}
              <span style={{ color: "var(--text-muted)" }}>     </span>https://api.nexus.io/v1/stats
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Settings Page ───

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <PageShell title="Settings" subtitle="Manage your account, preferences &amp; integrations">
      {(user) => (
        <>
          {/* Horizontal tab bar */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(17,24,39,0.5)", borderRadius: 12, padding: 4, border: "1px solid var(--border-color)", width: "fit-content" }}>
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: active ? "var(--bg-card)" : "transparent",
                  border: active ? "1px solid var(--border-color)" : "1px solid transparent",
                  color: active ? "var(--text-primary)" : "var(--text-muted)",
                  borderRadius: 9, padding: "8px 18px", fontSize: 13.5, cursor: "pointer",
                  fontFamily: "var(--font-family-body)", fontWeight: active ? 500 : 400,
                  transition: "all 0.2s", boxShadow: active ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
                }}>
                  <span style={{ fontSize: 15 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active tab content */}
          {activeTab === "profile"       && <ProfileTab user={user} />}
          {activeTab === "appearance"    && <AppearanceTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "security"      && <SecurityTab />}
          {activeTab === "api"           && <ApiTab />}
        </>
      )}
    </PageShell>
  );
}
