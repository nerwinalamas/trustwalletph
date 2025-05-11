import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create a new task with the given text
export const createUser = mutation({
  args: {
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    // Generate secure random digits (8 digits)
    const randomDigits = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const accountNumber = `TW-${randomDigits.slice(0, 4)}-${randomDigits.slice(4)}`;

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();

    if (existingUser) return;

    await ctx.db.insert("users", {
      clerkUserId: args.clerkUserId,
      firstName: args.firstName,
      lastName: args.lastName,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      profileImageUrl: args.profileImageUrl,
      walletBalance: 0,
      currency: "PHP",
      accountNumber: accountNumber,
      isVerified: false,
    });
  },
});
