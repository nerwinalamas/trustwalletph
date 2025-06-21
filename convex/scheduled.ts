import { internalMutation } from "./_generated/server";

export const resetDailyLimits = internalMutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    for (const user of users) {
      const limits = await ctx.db
        .query("accountLimits")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();

      if (limits && now - limits.lastDailyReset >= oneDay) {
        await ctx.db.patch(limits._id, {
          dailyUsed: 0,
          lastDailyReset: now,
        });
      }
    }
  },
});

export const resetMonthlyLimits = internalMutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const now = new Date();
    const currentMonth = now.getMonth();

    for (const user of users) {
      const limits = await ctx.db
        .query("accountLimits")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();

      if (limits) {
        const lastResetMonth = new Date(limits.lastMonthlyReset).getMonth();
        if (lastResetMonth !== currentMonth) {
          await ctx.db.patch(limits._id, {
            monthlyUsed: 0,
            lastMonthlyReset: now.getTime(),
          });
        }
      }
    }
  },
});
