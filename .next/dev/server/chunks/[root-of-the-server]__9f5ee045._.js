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
"[project]/src/app/api/messages/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-server.ts [app-route] (ecmascript)");
;
;
const conversations = [
    {
        id: 1,
        contact: "Sofia Chen",
        avatar: "SC",
        unread: 2,
        lastTime: "2 min ago",
        pinned: true,
        lastMessage: "Can you share the Q4 analytics report draft?",
        messages: [
            {
                from: "Sofia Chen",
                text: "Hey, do you have the latest analytics?",
                time: "10:24 AM",
                mine: false
            },
            {
                from: "You",
                text: "Sure, let me pull it up now.",
                time: "10:25 AM",
                mine: true
            },
            {
                from: "Sofia Chen",
                text: "Great, also need the cohort retention numbers.",
                time: "10:28 AM",
                mine: false
            },
            {
                from: "You",
                text: "On it. I'll send both in one doc.",
                time: "10:29 AM",
                mine: true
            },
            {
                from: "Sofia Chen",
                text: "Can you share the Q4 analytics report draft?",
                time: "10:34 AM",
                mine: false
            }
        ]
    },
    {
        id: 2,
        contact: "Raj Patel",
        avatar: "RP",
        unread: 1,
        lastTime: "18 min ago",
        pinned: true,
        lastMessage: "The model accuracy is at 91.4% now.",
        messages: [
            {
                from: "Raj Patel",
                text: "Running the new model training now.",
                time: "9:50 AM",
                mine: false
            },
            {
                from: "You",
                text: "What dataset are you using?",
                time: "9:52 AM",
                mine: true
            },
            {
                from: "Raj Patel",
                text: "The expanded Jan-Dec dataset.",
                time: "9:55 AM",
                mine: false
            },
            {
                from: "Raj Patel",
                text: "The model accuracy is at 91.4% now.",
                time: "10:15 AM",
                mine: false
            }
        ]
    },
    {
        id: 3,
        contact: "Emma Wilson",
        avatar: "EW",
        unread: 0,
        lastTime: "1 hr ago",
        pinned: false,
        lastMessage: "The campaign goes live tomorrow at 9 AM.",
        messages: [
            {
                from: "You",
                text: "What's the status on the email campaign?",
                time: "8:40 AM",
                mine: true
            },
            {
                from: "Emma Wilson",
                text: "Designs are approved. Copy is finalized.",
                time: "8:45 AM",
                mine: false
            },
            {
                from: "Emma Wilson",
                text: "The campaign goes live tomorrow at 9 AM.",
                time: "8:48 AM",
                mine: false
            }
        ]
    },
    {
        id: 4,
        contact: "Lucas Martin",
        avatar: "LM",
        unread: 0,
        lastTime: "2 hrs ago",
        pinned: false,
        lastMessage: "I'll have the PR up by end of day.",
        messages: [
            {
                from: "You",
                text: "How's the auth refactor coming along?",
                time: "7:10 AM",
                mine: true
            },
            {
                from: "Lucas Martin",
                text: "Almost done. Found a couple edge cases.",
                time: "7:30 AM",
                mine: false
            },
            {
                from: "You",
                text: "Make sure to add unit tests for those.",
                time: "7:32 AM",
                mine: true
            },
            {
                from: "Lucas Martin",
                text: "I'll have the PR up by end of day.",
                time: "7:45 AM",
                mine: false
            }
        ]
    },
    {
        id: 5,
        contact: "Aisha Khan",
        avatar: "AK",
        unread: 0,
        lastTime: "3 hrs ago",
        pinned: false,
        lastMessage: "Let's schedule a sync for Friday at 2pm.",
        messages: [
            {
                from: "Aisha Khan",
                text: "Product roadmap review is this week.",
                time: "6:20 AM",
                mine: false
            },
            {
                from: "You",
                text: "I'll prep the metrics deck.",
                time: "6:25 AM",
                mine: true
            },
            {
                from: "Aisha Khan",
                text: "Let's schedule a sync for Friday at 2pm.",
                time: "6:30 AM",
                mine: false
            }
        ]
    },
    {
        id: 6,
        contact: "Mia Thompson",
        avatar: "MT",
        unread: 0,
        lastTime: "Yesterday",
        pinned: false,
        lastMessage: "Correlation looks strong. Publishing the findings.",
        messages: [
            {
                from: "You",
                text: "Any luck with the A/B test analysis?",
                time: "4:15 PM",
                mine: true
            },
            {
                from: "Mia Thompson",
                text: "Yes! Variant B is 14% better.",
                time: "4:40 PM",
                mine: false
            },
            {
                from: "Mia Thompson",
                text: "Correlation looks strong. Publishing the findings.",
                time: "4:42 PM",
                mine: false
            }
        ]
    },
    {
        id: 7,
        contact: "Oliver Wright",
        avatar: "OW",
        unread: 0,
        lastTime: "Yesterday",
        pinned: false,
        lastMessage: "Blog post is scheduled for Monday.",
        messages: [
            {
                from: "Oliver Wright",
                text: "Finished the case study draft.",
                time: "2:00 PM",
                mine: false
            },
            {
                from: "You",
                text: "Looks great. Minor edits on page 3.",
                time: "2:20 PM",
                mine: true
            },
            {
                from: "Oliver Wright",
                text: "Blog post is scheduled for Monday.",
                time: "2:35 PM",
                mine: false
            }
        ]
    }
];
async function GET(req) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateRequest"])(req);
    if ("error" in result) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const unreadCount = conversations.reduce((s, c)=>s + c.unread, 0);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        conversations,
        unreadCount
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9f5ee045._.js.map