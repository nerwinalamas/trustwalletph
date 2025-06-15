import { query } from "./_generated/server";

const getUserTransactions = query({
  handler: async (ctx) => {
    try {
      // 1. Authentication check
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        console.log("No identity found - user not authenticated");
        return [];
      }

      // 2. Get user FIRST (using Clerk ID)
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_user", (q) =>
          q.eq("clerkUserId", identity.subject)
        )
        .unique();

      if (!user) {
        console.log("No user found in database");
        return [];
      }

      // 3. Get transactions USING INDEX
      return await ctx.db
        .query("transactions")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  },
});

export { getUserTransactions };

