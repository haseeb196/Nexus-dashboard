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
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-server.ts [app-route] (ecmascript)");
;
;
const products = [
    {
        id: 1,
        name: "Nexus Pro",
        category: "Software",
        price: 149,
        revenue: 82400,
        sales: 553,
        status: "Active",
        stock: 0,
        trend: 12.4,
        rating: 4.8,
        description: "Enterprise analytics suite"
    },
    {
        id: 2,
        name: "DataFlow Engine",
        category: "Software",
        price: 299,
        revenue: 64200,
        sales: 215,
        status: "Active",
        stock: 0,
        trend: 8.1,
        rating: 4.6,
        description: "Real-time data pipeline tool"
    },
    {
        id: 3,
        name: "Nexus Starter",
        category: "Software",
        price: 49,
        revenue: 41800,
        sales: 853,
        status: "Active",
        stock: 0,
        trend: -2.3,
        rating: 4.5,
        description: "Entry-level analytics package"
    },
    {
        id: 4,
        name: "API Gateway",
        category: "Infrastructure",
        price: 199,
        revenue: 38600,
        sales: 194,
        status: "Active",
        stock: 0,
        trend: 5.7,
        rating: 4.7,
        description: "Managed API gateway service"
    },
    {
        id: 5,
        name: "Cloud Storage Pack",
        category: "Infrastructure",
        price: 79,
        revenue: 29400,
        sales: 372,
        status: "Active",
        stock: 0,
        trend: 3.2,
        rating: 4.4,
        description: "Scalable cloud storage solution"
    },
    {
        id: 6,
        name: "Security Shield",
        category: "Security",
        price: 249,
        revenue: 24800,
        sales: 100,
        status: "Active",
        stock: 0,
        trend: 15.8,
        rating: 4.9,
        description: "Advanced threat protection"
    },
    {
        id: 7,
        name: "DevOps Toolkit",
        category: "Tools",
        price: 129,
        revenue: 18600,
        sales: 144,
        status: "Low Stock",
        stock: 12,
        trend: -1.1,
        rating: 4.3,
        description: "CI/CD and deployment tools"
    },
    {
        id: 8,
        name: "Monitoring Hub",
        category: "Infrastructure",
        price: 179,
        revenue: 14200,
        sales: 79,
        status: "Active",
        stock: 0,
        trend: 9.4,
        rating: 4.6,
        description: "System health monitoring"
    },
    {
        id: 9,
        name: "Auth Connect",
        category: "Security",
        price: 99,
        revenue: 11800,
        sales: 119,
        status: "Low Stock",
        stock: 5,
        trend: -4.2,
        rating: 4.2,
        description: "SSO and identity management"
    },
    {
        id: 10,
        name: "Analytics Add-on",
        category: "Software",
        price: 69,
        revenue: 8900,
        sales: 129,
        status: "Discontinued",
        stock: 0,
        trend: -18.6,
        rating: 3.9,
        description: "Legacy analytics extension"
    }
];
const categories = [
    {
        name: "Software",
        count: 4,
        revenue: 208400,
        color: "#06b6d4"
    },
    {
        name: "Infrastructure",
        count: 3,
        revenue: 82200,
        color: "#8b5cf6"
    },
    {
        name: "Security",
        count: 2,
        revenue: 36600,
        color: "#10b981"
    },
    {
        name: "Tools",
        count: 1,
        revenue: 18600,
        color: "#f59e0b"
    }
];
async function GET(req) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateRequest"])(req);
    if ("error" in result) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const totalRevenue = products.reduce((s, p)=>s + p.revenue, 0);
    const totalSales = products.reduce((s, p)=>s + p.sales, 0);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        products,
        categories,
        totalRevenue,
        totalSales,
        totalProducts: products.length
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3633a10d._.js.map