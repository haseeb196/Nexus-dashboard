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
"[project]/src/app/api/analytics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-server.ts [app-route] (ecmascript)");
;
;
function seededRandom(seed) {
    let s = seed;
    return ()=>{
        s = s * 1664525 + 1013904223 & 0x7fffffff;
        return s / 0x7fffffff;
    };
}
function generateAnalytics() {
    const rand = seededRandom(97);
    // ─── 1. Conversion Funnel ───
    const funnel = [
        {
            stage: "Landed",
            value: 24800
        },
        {
            stage: "Signed Up",
            value: 18400
        },
        {
            stage: "Onboarded",
            value: 11200
        },
        {
            stage: "Activated",
            value: 6800
        },
        {
            stage: "Converted",
            value: 3200
        }
    ];
    // ─── 2. Cohort Retention (%) — 6 cohorts × 6 weeks ───
    const cohortLabels = [
        "Jan '25",
        "Feb '25",
        "Mar '25",
        "Apr '25",
        "May '25",
        "Jun '25"
    ];
    const cohortRetention = cohortLabels.map((_, ci)=>Array.from({
            length: 6 - ci
        }, (_, wi)=>{
            const base = wi === 0 ? 100 : 100 - wi * 16;
            return Math.max(8, Math.round(base + (rand() - 0.5) * 12));
        }));
    // ─── 3. Geographic breakdown ───
    const geoData = [
        {
            country: "United States",
            visitors: 38200,
            flag: "🇺🇸",
            pct: 31.2
        },
        {
            country: "United Kingdom",
            visitors: 12800,
            flag: "🇬🇧",
            pct: 10.5
        },
        {
            country: "Germany",
            visitors: 9400,
            flag: "🇩🇪",
            pct: 7.7
        },
        {
            country: "India",
            visitors: 8900,
            flag: "🇮🇳",
            pct: 7.3
        },
        {
            country: "Canada",
            visitors: 7200,
            flag: "🇨🇦",
            pct: 5.9
        },
        {
            country: "Australia",
            visitors: 5800,
            flag: "🇦🇺",
            pct: 4.7
        },
        {
            country: "France",
            visitors: 4600,
            flag: "🇫🇷",
            pct: 3.8
        },
        {
            country: "Japan",
            visitors: 3900,
            flag: "🇯🇵",
            pct: 3.2
        }
    ];
    // ─── 4. Device split ───
    const devices = [
        {
            type: "Desktop",
            pct: 52,
            icon: "🖥️",
            color: "#06b6d4"
        },
        {
            type: "Mobile",
            pct: 36,
            icon: "📱",
            color: "#8b5cf6"
        },
        {
            type: "Tablet",
            pct: 12,
            icon: "📲",
            color: "#10b981"
        }
    ];
    // ─── 5. Page performance table ───
    const pages = [
        {
            path: "/home",
            views: 48200,
            avgTime: "2m 34s",
            bounce: 32.1,
            trend: 4.2
        },
        {
            path: "/pricing",
            views: 31600,
            avgTime: "3m 12s",
            bounce: 41.8,
            trend: -1.5
        },
        {
            path: "/features",
            views: 24800,
            avgTime: "4m 08s",
            bounce: 28.4,
            trend: 6.7
        },
        {
            path: "/blog/getting-started",
            views: 18900,
            avgTime: "5m 45s",
            bounce: 22.0,
            trend: 9.1
        },
        {
            path: "/signup",
            views: 14200,
            avgTime: "1m 52s",
            bounce: 55.3,
            trend: -3.8
        },
        {
            path: "/dashboard",
            views: 11800,
            avgTime: "8m 20s",
            bounce: 12.6,
            trend: 2.3
        },
        {
            path: "/docs/api",
            views: 9400,
            avgTime: "6m 15s",
            bounce: 18.9,
            trend: 5.0
        }
    ];
    // ─── 6. Sessions over time (daily last 30 days) ───
    const sessionData = Array.from({
        length: 30
    }, (_, i)=>{
        const base = 1800 + Math.sin(i * 0.4) * 400;
        const weekend = i % 7 >= 5 ? 0.6 : 1;
        return {
            day: i + 1,
            sessions: Math.round((base + (rand() - 0.45) * 500) * weekend),
            pageViews: Math.round((base * 3.2 + (rand() - 0.4) * 800) * weekend)
        };
    });
    // ─── 7. Top referrers ───
    const referrers = [
        {
            source: "google.com",
            visits: 18400,
            newUsers: 12200
        },
        {
            source: "twitter.com",
            visits: 7800,
            newUsers: 5100
        },
        {
            source: "github.com",
            visits: 5600,
            newUsers: 4200
        },
        {
            source: "producthunt.com",
            visits: 4100,
            newUsers: 3600
        },
        {
            source: "hackernews.com",
            visits: 3200,
            newUsers: 2800
        }
    ];
    return {
        funnel,
        cohortLabels,
        cohortRetention,
        geoData,
        devices,
        pages,
        sessionData,
        referrers
    };
}
async function GET(req) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateRequest"])(req);
    if ("error" in result) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(generateAnalytics());
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a3195c17._.js.map