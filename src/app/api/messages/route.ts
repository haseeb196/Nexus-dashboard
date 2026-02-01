import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-server";

const conversations = [
  {
    id: 1, contact: "Sofia Chen", avatar: "SC", unread: 2, lastTime: "2 min ago", pinned: true,
    lastMessage: "Can you share the Q4 analytics report draft?",
    messages: [
      { from: "Sofia Chen", text: "Hey, do you have the latest analytics?", time: "10:24 AM", mine: false },
      { from: "You", text: "Sure, let me pull it up now.", time: "10:25 AM", mine: true },
      { from: "Sofia Chen", text: "Great, also need the cohort retention numbers.", time: "10:28 AM", mine: false },
      { from: "You", text: "On it. I'll send both in one doc.", time: "10:29 AM", mine: true },
      { from: "Sofia Chen", text: "Can you share the Q4 analytics report draft?", time: "10:34 AM", mine: false },
    ],
  },
  {
    id: 2, contact: "Raj Patel", avatar: "RP", unread: 1, lastTime: "18 min ago", pinned: true,
    lastMessage: "The model accuracy is at 91.4% now.",
    messages: [
      { from: "Raj Patel", text: "Running the new model training now.", time: "9:50 AM", mine: false },
      { from: "You", text: "What dataset are you using?", time: "9:52 AM", mine: true },
      { from: "Raj Patel", text: "The expanded Jan-Dec dataset.", time: "9:55 AM", mine: false },
      { from: "Raj Patel", text: "The model accuracy is at 91.4% now.", time: "10:15 AM", mine: false },
    ],
  },
  {
    id: 3, contact: "Emma Wilson", avatar: "EW", unread: 0, lastTime: "1 hr ago", pinned: false,
    lastMessage: "The campaign goes live tomorrow at 9 AM.",
    messages: [
      { from: "You", text: "What's the status on the email campaign?", time: "8:40 AM", mine: true },
      { from: "Emma Wilson", text: "Designs are approved. Copy is finalized.", time: "8:45 AM", mine: false },
      { from: "Emma Wilson", text: "The campaign goes live tomorrow at 9 AM.", time: "8:48 AM", mine: false },
    ],
  },
  {
    id: 4, contact: "Lucas Martin", avatar: "LM", unread: 0, lastTime: "2 hrs ago", pinned: false,
    lastMessage: "I'll have the PR up by end of day.",
    messages: [
      { from: "You", text: "How's the auth refactor coming along?", time: "7:10 AM", mine: true },
      { from: "Lucas Martin", text: "Almost done. Found a couple edge cases.", time: "7:30 AM", mine: false },
      { from: "You", text: "Make sure to add unit tests for those.", time: "7:32 AM", mine: true },
      { from: "Lucas Martin", text: "I'll have the PR up by end of day.", time: "7:45 AM", mine: false },
    ],
  },
  {
    id: 5, contact: "Aisha Khan", avatar: "AK", unread: 0, lastTime: "3 hrs ago", pinned: false,
    lastMessage: "Let's schedule a sync for Friday at 2pm.",
    messages: [
      { from: "Aisha Khan", text: "Product roadmap review is this week.", time: "6:20 AM", mine: false },
      { from: "You", text: "I'll prep the metrics deck.", time: "6:25 AM", mine: true },
      { from: "Aisha Khan", text: "Let's schedule a sync for Friday at 2pm.", time: "6:30 AM", mine: false },
    ],
  },
  {
    id: 6, contact: "Mia Thompson", avatar: "MT", unread: 0, lastTime: "Yesterday", pinned: false,
    lastMessage: "Correlation looks strong. Publishing the findings.",
    messages: [
      { from: "You", text: "Any luck with the A/B test analysis?", time: "4:15 PM", mine: true },
      { from: "Mia Thompson", text: "Yes! Variant B is 14% better.", time: "4:40 PM", mine: false },
      { from: "Mia Thompson", text: "Correlation looks strong. Publishing the findings.", time: "4:42 PM", mine: false },
    ],
  },
  {
    id: 7, contact: "Oliver Wright", avatar: "OW", unread: 0, lastTime: "Yesterday", pinned: false,
    lastMessage: "Blog post is scheduled for Monday.",
    messages: [
      { from: "Oliver Wright", text: "Finished the case study draft.", time: "2:00 PM", mine: false },
      { from: "You", text: "Looks great. Minor edits on page 3.", time: "2:20 PM", mine: true },
      { from: "Oliver Wright", text: "Blog post is scheduled for Monday.", time: "2:35 PM", mine: false },
    ],
  },
];

export async function GET(req: NextRequest) {
  const result = authenticateRequest(req);
  if ("error" in result) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const unreadCount = conversations.reduce((s, c) => s + c.unread, 0);
  return NextResponse.json({ conversations, unreadCount });
}
