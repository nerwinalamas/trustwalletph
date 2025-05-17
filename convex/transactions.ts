import { query } from "./_generated/server";

export const getUserTransactions = query({
  handler: async (ctx) => {
    // 1. Authentication check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // 2. Get user FIRST (using Clerk ID)
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // 3. Get transactions USING INDEX
    return await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id)) // Use the user's database ID
      .collect();
  },
});
