# Nexus Dashboard

A production-grade Next.js 15 analytics dashboard with **real authentication** (JWT + bcrypt) and backend-powered statistics visualisations.

---

## Quick Start

```bash
# 1. Download and extract this folder
# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## Demo Credentials

| Email            | Password  | Role  |
|------------------|-----------|-------|
| admin@nexus.io   | admin123  | Admin |

You can also **register** a new account from the login screen.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout + ambient background effects
│   ├── page.tsx                # Auth gate → redirects to /login or /dashboard
│   ├── login/page.tsx          # Login & Register page
│   ├── dashboard/page.tsx      # Main dashboard with all charts & tables
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts  # POST — validates credentials, sets JWT cookie
│       │   ├── register/route.ts # POST — creates user, sets JWT cookie
│       │   ├── me/route.ts     # GET — returns current user (auth check)
│       │   └── logout/route.ts # POST — clears auth cookie
│       └── stats/route.ts      # GET — returns all dashboard metrics (auth-gated)
├── components/
│   ├── Sidebar.tsx             # Left navigation with brand + nav items
│   ├── TopBar.tsx              # Header with user info + logout
│   ├── KPICard.tsx             # Summary metric cards with trend badges
│   ├── RevenueChart.tsx        # 12-month area chart (Revenue / Visitors / Conversions)
│   ├── TrafficPie.tsx          # Donut chart for traffic source breakdown
│   ├── ActivityHeatmap.tsx     # 7-day × 24-hour activity heatmap
│   └── UsersTable.tsx          # Recent users table with status & role badges
├── lib/
│   ├── auth-server.ts          # bcrypt hashing, JWT sign/verify, cookie helpers, user store
│   └── auth-client.ts          # Client fetch wrappers for auth endpoints
└── styles/
    └── globals.css             # Tailwind v4 + custom design tokens + glassmorphism
```

---

## How Auth Works

1. **Registration / Login** → `POST /api/auth/login` or `/register`
   - Password is hashed with **bcrypt** (10 rounds)
   - On success, a signed **JWT** (7-day expiry) is set as an **HttpOnly cookie**
2. **Protected Routes** → Every API call reads the cookie, verifies the JWT, and resolves the user
3. **Logout** → Cookie is cleared; client redirects to `/login`
4. **User Store** → Currently in-memory (replace with a database in production)

---

## Dashboard Features

| Widget | Description |
|--------|-------------|
| **KPI Cards** | Total Revenue, Visitors, Conversions, Conversion Rate — with month-over-month trend |
| **Revenue & Engagement** | 12-month stacked area chart with interactive tooltips |
| **Traffic Sources** | Donut chart breaking down Organic, Direct, Social, Referral, Email |
| **Activity Heatmap** | 7×24 grid showing hourly user activity intensity |
| **Users Table** | Live user list with avatar, role badge, online status & last-active time |

---

## Customisation

- **Swap the user store** → Replace the in-memory array in `auth-server.ts` with MongoDB / PostgreSQL / etc.
- **Add real data** → Replace `generateStats()` in `api/stats/route.ts` with actual DB queries
- **Change the JWT secret** → Set `JWT_SECRET` as an environment variable
- **Theming** → All colours are CSS custom properties in `globals.css`
