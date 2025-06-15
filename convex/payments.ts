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

    // Get the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();
    if (!user) throw new Error("User not found");

    // Check balance
    if (user.walletBalance < args.amount + SERVICE_FEE) {
      // Including service fee
      throw new Error("Insufficient balance");
    }

    // Deduct from user's balance
    await ctx.db.patch(user._id, {
      walletBalance: user.walletBalance - (args.amount + SERVICE_FEE),
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

