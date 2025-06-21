import { query } from "./_generated/server";

const getUserLimits = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();
    if (!user) throw new Error("User not found");

    const limits = await ctx.db
      .query("accountLimits")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
    if (!limits) throw new Error("Limits not found");

    return {
      tier: limits.tier,
      daily: {
        limit: limits.dailyLimit,
        used: limits.dailyUsed,
        remaining: limits.dailyLimit - limits.dailyUsed,
        resetsAt: new Date(limits.lastDailyReset + 86400000).toISOString(),
      },
      monthly: {
        limit: limits.monthlyLimit,
        used: limits.monthlyUsed,
        remaining: limits.monthlyLimit - limits.monthlyUsed,
        resetsAt: new Date(
          new Date(limits.lastMonthlyReset).setMonth(
            new Date(limits.lastMonthlyReset).getMonth() + 1
          )
        ).toISOString(),
      },
      singleTx: limits.singleTxLimit,
      balance: {
        current: user.walletBalance,
        limit: limits.balanceLimit,
      },
      p2pTransfer: limits.p2pTransferLimit,
      billPayment: limits.billPaymentLimit,
      withdrawal: limits.withdrawalLimit,
    };
  },
});

export { getUserLimits };
