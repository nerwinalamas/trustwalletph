import { v } from "convex/values";
import {
  mutation,
  query
} from "./_generated/server";

export const getNotificationPreferences = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    return user?.notificationPreferences;
  },
});

export const updateNotificationPreferences = mutation({
  args: {
    preferences: v.object({
      pushEnabled: v.boolean(),
      transactionAlerts: v.boolean(),
      soundEnabled: v.boolean(),
      vibrationEnabled: v.boolean(),
      quietHoursEnabled: v.boolean(),
      quietHoursStart: v.string(),
      quietHoursEnd: v.string(),
    }),
  },
  handler: async (ctx, { preferences }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      notificationPreferences: preferences,
    });

    return { success: true };
  },
});

// export const sendPushNotification = internalAction({
//   args: {
//     token: v.string(),
//     title: v.string(),
//     body: v.string(),
//     data: v.optional(v.any()),
//   },
//   handler: async (ctx, { token, title, body, data }) => {
//     await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Accept-encoding": "gzip, deflate",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         to: token,
//         title,
//         body,
//         data,
//         sound: "default",
//       }),
//     });
//   },
// });

// export const createNotification = internalMutation({
//   args: {
//     userId: v.id("users"),
//     title: v.string(),
//     message: v.string(),
//     type: v.union(
//       v.literal("transaction"),
//       v.literal("security"),
//       v.literal("promotion"),
//       v.literal("system")
//     ),
//   },
//   handler: async (ctx, { userId, title, message, type }) => {
//     const user = await ctx.db.get(userId);
//     if (!user || !user.notificationPreferences.pushEnabled) return;

//     if (user.notificationPreferences.quietHoursEnabled) {
//       const now = new Date();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();
//       const currentTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

//       const [startHour, startMinute] =
//         user.notificationPreferences.quietHoursStart.split(":").map(Number);
//       const [endHour, endMinute] = user.notificationPreferences.quietHoursEnd
//         .split(":")
//         .map(Number);

//       const isQuietTime =
//         hours > startHour ||
//         (hours === startHour && minutes >= startMinute) ||
//         hours < endHour ||
//         (hours === endHour && minutes < endMinute);

//       if (isQuietTime) return;
//     }

//     await ctx.db.insert("notifications", {
//       userId,
//       title,
//       message,
//       type,
//       isRead: false,
//     });

//     if (user.pushToken) {
//       await ctx.scheduler.runAfter(0, api.notifications.sendPushNotification, {
//         token: user.pushToken,
//         title,
//         body: message,
//         data: { type },
//       });
//     }
//   },
// });
