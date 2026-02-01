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
"[project]/src/app/api/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-server.ts [app-route] (ecmascript)");
;
;
const users = [
    {
        id: 1,
        name: "Sofia Chen",
        email: "sofia@nexus.io",
        role: "Admin",
        department: "Engineering",
        status: "Active",
        joined: "Jan 12, 2024",
        lastActive: "2 min ago",
        activity: 94,
        avatar: "SC"
    },
    {
        id: 2,
        name: "Raj Patel",
        email: "raj@nexus.io",
        role: "Analyst",
        department: "Data Science",
        status: "Active",
        joined: "Feb 3, 2024",
        lastActive: "15 min ago",
        activity: 82,
        avatar: "RP"
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma@nexus.io",
        role: "Viewer",
        department: "Marketing",
        status: "Active",
        joined: "Feb 18, 2024",
        lastActive: "1 hr ago",
        activity: 71,
        avatar: "EW"
    },
    {
        id: 4,
        name: "Lucas Martin",
        email: "lucas@nexus.io",
        role: "Analyst",
        department: "Engineering",
        status: "Idle",
        joined: "Mar 7, 2024",
        lastActive: "3 hrs ago",
        activity: 58,
        avatar: "LM"
    },
    {
        id: 5,
        name: "Aisha Khan",
        email: "aisha@nexus.io",
        role: "Admin",
        department: "Product",
        status: "Active",
        joined: "Mar 22, 2024",
        lastActive: "5 min ago",
        activity: 91,
        avatar: "AK"
    },
    {
        id: 6,
        name: "Noah Davis",
        email: "noah@nexus.io",
        role: "Viewer",
        department: "Sales",
        status: "Away",
        joined: "Apr 10, 2024",
        lastActive: "2 days ago",
        activity: 34,
        avatar: "ND"
    },
    {
        id: 7,
        name: "Mia Thompson",
        email: "mia@nexus.io",
        role: "Analyst",
        department: "Data Science",
        status: "Active",
        joined: "Apr 28, 2024",
        lastActive: "8 min ago",
        activity: 78,
        avatar: "MT"
    },
    {
        id: 8,
        name: "Oliver Wright",
        email: "oliver@nexus.io",
        role: "Viewer",
        department: "Marketing",
        status: "Active",
        joined: "May 15, 2024",
        lastActive: "42 min ago",
        activity: 65,
        avatar: "OW"
    },
    {
        id: 9,
        name: "Zara Ali",
        email: "zara@nexus.io",
        role: "Analyst",
        department: "Product",
        status: "Idle",
        joined: "Jun 2, 2024",
        lastActive: "4 hrs ago",
        activity: 47,
        avatar: "ZA"
    },
    {
        id: 10,
        name: "Ethan Clark",
        email: "ethan@nexus.io",
        role: "Viewer",
        department: "Sales",
        status: "Active",
        joined: "Jun 19, 2024",
        lastActive: "20 min ago",
        activity: 72,
        avatar: "EC"
    },
    {
        id: 11,
        name: "Priya Sharma",
        email: "priya@nexus.io",
        role: "Analyst",
        department: "Engineering",
        status: "Active",
        joined: "Jul 8, 2024",
        lastActive: "1 min ago",
        activity: 88,
        avatar: "PS"
    },
    {
        id: 12,
        name: "James Lee",
        email: "james@nexus.io",
        role: "Viewer",
        department: "Sales",
        status: "Away",
        joined: "Jul 25, 2024",
        lastActive: "1 week ago",
        activity: 21,
        avatar: "JL"
    }
];
const departments = [
    {
        name: "Engineering",
        count: 3,
        color: "#06b6d4"
    },
    {
        name: "Data Science",
        count: 2,
        color: "#8b5cf6"
    },
    {
        name: "Marketing",
        count: 2,
        color: "#10b981"
    },
    {
        name: "Product",
        count: 2,
        color: "#f59e0b"
    },
    {
        name: "Sales",
        count: 3,
        color: "#f43f5e"
    }
];
async function GET(req) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateRequest"])(req);
    if ("error" in result) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        users,
        departments,
        totalUsers: users.length,
        activeUsers: users.filter((u)=>u.status === "Active").length
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5708a2ce._.js.map