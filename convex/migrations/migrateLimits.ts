import { mutation } from "../_generated/server";

export const migrateUserLimits = mutation({
  args: {},
  handler: async (ctx) => {
    // Kunin lahat ng existing users
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      // Check kung may existing limits na ang user
      const existingLimits = await ctx.db
        .query("accountLimits")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();

      // Kung wala pa, gumawa ng bagong entry
      if (!existingLimits) {
        await ctx.db.insert("accountLimits", {
          userId: user._id,
          tier: user.verificationTier || "basic",

          // Default limits based on verification tier
          dailyLimit: user.verificationTier === "verified" ? 20000 : 5000,
          monthlyLimit: user.verificationTier === "verified" ? 100000 : 25000,
          singleTxLimit: user.verificationTier === "verified" ? 5000 : 1000,
          balanceLimit: user.verificationTier === "verified" ? 50000 : 10000,

          // Initialize usage
          dailyUsed: 0,
          monthlyUsed: 0,

          // Set reset timestamps
          lastDailyReset: Date.now(),
          lastMonthlyReset: Date.now(),

          // Additional limits
          p2pTransferLimit: user.verificationTier === "verified" ? 20000 : 5000,
          billPaymentLimit: user.verificationTier === "verified" ? 20000 : 5000,
          withdrawalLimit: user.verificationTier === "verified" ? 20000 : 5000,
        });
      }
    }

    return { success: true, migratedUsers: users.length };
  },
});
