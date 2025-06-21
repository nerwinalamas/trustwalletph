import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SERVICE_FEE = 15;

const payBill = mutation({
  args: {
    companyId: v.string(),
    companyName: v.string(),
    accountNumber: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get user and limits
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

    const totalAmount = args.amount + SERVICE_FEE;

    // Check all limits
    if (user.walletBalance < totalAmount) {
      throw new Error("Insufficient balance");
    }
    if (args.amount > limits.singleTxLimit) {
      throw new Error(
        `Amount exceeds single transaction limit of ₱${limits.singleTxLimit}`
      );
    }
    if (limits.dailyUsed + args.amount > limits.dailyLimit) {
      throw new Error(
        `Payment would exceed daily limit of ₱${limits.dailyLimit}`
      );
    }
    if (limits.monthlyUsed + args.amount > limits.monthlyLimit) {
      throw new Error(
        `Payment would exceed monthly limit of ₱${limits.monthlyLimit}`
      );
    }

    // Deduct from user's balance and update limits
    await ctx.db.patch(user._id, {
      walletBalance: user.walletBalance - totalAmount,
    });

    await ctx.db.patch(limits._id, {
      dailyUsed: limits.dailyUsed + args.amount,
      monthlyUsed: limits.monthlyUsed + args.amount,
    });

    // Create transaction record
    const transactionId = await ctx.db.insert("transactions", {
      userId: user._id,
      transactionType: "bill",
      title: `Payment to ${args.companyName}`,
      amount: args.amount,
      description: `Account: ${args.accountNumber}`,
      recipientType: "bill",
      recipientId: args.companyId,
    });

    return transactionId;
  },
});

export { payBill };

