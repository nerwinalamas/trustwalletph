import { mutation } from "../_generated/server";

export const calculateCurrentUsage = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = new Date(now.setHours(0, 0, 0, 0)).getTime();

    for (const user of users) {
      const limits = await ctx.db
        .query("accountLimits")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();

      if (!limits) continue;

      // Get today's transactions
      const dailyTx = await ctx.db
        .query("transactions")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .filter((q) =>
          q.and(
            q.eq(q.field("transactionType"), "send"),
            q.gte(q.field("_creationTime"), today)
          )
        )
        .collect();

      // Get this month's transactions
      const monthlyTx = await ctx.db
        .query("transactions")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .filter((q) =>
          q.and(
            q.eq(q.field("transactionType"), "send"),
            q.gte(
              q.field("_creationTime"),
              new Date(currentYear, currentMonth, 1).getTime()
            )
          )
        )
        .collect();

      const dailyUsed = dailyTx.reduce((sum, tx) => sum + tx.amount, 0);
      const monthlyUsed = monthlyTx.reduce((sum, tx) => sum + tx.amount, 0);

      await ctx.db.patch(limits._id, {
        dailyUsed,
        monthlyUsed,
      });
    }

    return { success: true };
  },
});
