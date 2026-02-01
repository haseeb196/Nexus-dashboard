module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/lib/auth-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authenticateRequest",
    ()=>authenticateRequest,
    "clearAuthCookie",
    ()=>clearAuthCookie,
    "createUser",
    ()=>createUser,
    "findByEmail",
    ()=>findByEmail,
    "getTokenFromRequest",
    ()=>getTokenFromRequest,
    "sanitizeUser",
    ()=>sanitizeUser,
    "setAuthCookie",
    ()=>setAuthCookie,
    "signToken",
    ()=>signToken,
    "verifyPassword",
    ()=>verifyPassword,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/cookie/dist/index.js [app-route] (ecmascript)");
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || "nexus-dashboard-secret-key-change-in-prod";
const COOKIE_NAME = "nexus_token";
const users = [];
// Seed default admin
(async ()=>{
    const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash("admin123", 10);
    users.push({
        id: "1",
        email: "admin@nexus.io",
        name: "Alex Morgan",
        passwordHash: hash,
        role: "admin",
        createdAt: new Date().toISOString()
    });
})();
function findByEmail(email) {
    return users.find((u)=>u.email.toLowerCase() === email.toLowerCase());
}
async function createUser(email, name, password) {
    if (findByEmail(email)) throw new Error("User already exists");
    const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
    const user = {
        id: String(Date.now()),
        email,
        name,
        passwordHash: hash,
        role: users.length === 0 ? "admin" : "analyst",
        createdAt: new Date().toISOString()
    };
    users.push(user);
    return user;
}
async function verifyPassword(plain, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(plain, hash);
}
function signToken(userId, email) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        userId,
        email
    }, JWT_SECRET, {
        expiresIn: "7d"
    });
}
function verifyToken(token) {
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        return decoded;
    } catch  {
        return null;
    }
}
function setAuthCookie(res, token) {
    res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });
    return res;
}
function clearAuthCookie(res) {
    res.cookies.set(COOKIE_NAME, "", {
        maxAge: 0,
        path: "/"
    });
    return res;
}
function getTokenFromRequest(req) {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"])(cookieHeader);
    return cookies[COOKIE_NAME] || null;
}
function authenticateRequest(req) {
    const token = getTokenFromRequest(req);
    if (!token) return {
        error: "No token"
    };
    const payload = verifyToken(token);
    if (!payload) return {
        error: "Invalid token"
    };
    const user = users.find((u)=>u.id === payload.userId);
    if (!user) return {
        error: "User not found"
    };
    return {
        user
    };
}
function sanitizeUser(user) {
    const { passwordHash, ...safe } = user;
    return safe;
}
}),
"[project]/src/app/api/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-server.ts [app-route] (ecmascript)");
;
;
// ─── Deterministic pseudo-random (seeded) ───
function seededRandom(seed) {
    let s = seed;
    return ()=>{
        s = s * 1664525 + 1013904223 & 0x7fffffff;
        return s / 0x7fffffff;
    };
}
function generateStats() {
    const rand = seededRandom(42);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    // Revenue & visitors over 12 months
    const revenueData = months.map((month, i)=>{
        const base = 30000 + i * 4500;
        return {
            month,
            revenue: Math.round(base + (rand() - 0.3) * 12000),
            visitors: Math.round(8000 + i * 1200 + (rand() - 0.4) * 3000),
            conversions: Math.round(1200 + i * 200 + (rand() - 0.35) * 600)
        };
    });
    // Traffic sources (pie)
    const trafficSources = [
        {
            name: "Organic Search",
            value: 38,
            color: "#06b6d4"
        },
        {
            name: "Direct",
            value: 25,
            color: "#8b5cf6"
        },
        {
            name: "Social Media",
            value: 18,
            color: "#10b981"
        },
        {
            name: "Referral",
            value: 12,
            color: "#f59e0b"
        },
        {
            name: "Email",
            value: 7,
            color: "#f43f5e"
        }
    ];
    // Weekly active hours heatmap (7 days × 24 hours)
    const activityHeatmap = Array.from({
        length: 7
    }, (_, day)=>Array.from({
            length: 24
        }, (_, hour)=>{
            const peak = hour >= 9 && hour <= 17 ? 1 : 0.3;
            const weekend = day >= 5 ? 0.5 : 1;
            return Math.round((rand() * 60 + 10) * peak * weekend);
        }));
    // Recent users table
    const names = [
        "Sofia Chen",
        "Raj Patel",
        "Emma Wilson",
        "Lucas Martin",
        "Aisha Khan",
        "Noah Davis",
        "Mia Thompson",
        "Oliver Wright",
        "Zara Ali",
        "Ethan Clark"
    ];
    const roles = [
        "Admin",
        "Analyst",
        "Viewer"
    ];
    const statuses = [
        "Active",
        "Active",
        "Active",
        "Idle",
        "Active",
        "Away"
    ];
    const recentUsers = names.map((name, i)=>({
            id: i + 1,
            name,
            email: `${name.split(" ")[0].toLowerCase()}@nexus.io`,
            role: roles[i % roles.length],
            status: statuses[i % statuses.length],
            lastActive: `${Math.floor(rand() * 60)} min ago`
        }));
    // KPI cards
    const totalRevenue = revenueData.reduce((s, d)=>s + d.revenue, 0);
    const totalVisitors = revenueData.reduce((s, d)=>s + d.visitors, 0);
    const totalConversions = revenueData.reduce((s, d)=>s + d.conversions, 0);
    const conversionRate = (totalConversions / totalVisitors * 100).toFixed(1);
    return {
        kpis: [
            {
                label: "Total Revenue",
                value: `$${(totalRevenue / 1000).toFixed(0)}K`,
                change: 12.5,
                trend: "up"
            },
            {
                label: "Total Visitors",
                value: `${(totalVisitors / 1000).toFixed(0)}K`,
                change: 8.2,
                trend: "up"
            },
            {
                label: "Conversions",
                value: `${(totalConversions / 1000).toFixed(1)}K`,
                change: -2.1,
                trend: "down"
            },
            {
                label: "Conv. Rate",
                value: `${conversionRate}%`,
                change: 0.4,
                trend: "up"
            }
        ],
        revenueData,
        trafficSources,
        activityHeatmap,
        recentUsers
    };
}
async function GET(req) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateRequest"])(req);
    if ("error" in result) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(generateStats());
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0d66f366._.js.map