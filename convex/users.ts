import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const generateAccountNumber = () => {
  const randomDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `TW-${randomDigits.slice(0, 4)}-${randomDigits.slice(4)}`;
};

// Create a new task with the given text
const createUser = mutation({
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
    // Check for existing user by BOTH Clerk ID AND Email
    const existingByClerkId = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();

    const existingByEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) =>
        q.eq("email", args.email.toLowerCase().trim())
      )
      .first();

    // Handle merge cases
    if (existingByClerkId && existingByEmail) {
      if (existingByClerkId._id !== existingByEmail._id) {
        // Merge accounts if same email but different Clerk IDs
        await ctx.db.patch(existingByEmail._id, {
          clerkUserId: args.clerkUserId,
          profileImageUrl: args.profileImageUrl,
        });
        await ctx.db.delete(existingByClerkId._id);
      }
      return; // User already exists
    }

    if (existingByEmail) {
      // Update existing email user with new Clerk ID
      return await ctx.db.patch(existingByEmail._id, {
        clerkUserId: args.clerkUserId,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImageUrl: args.profileImageUrl,
      });
    }

    const accountNumber = generateAccountNumber();

    await ctx.db.insert("users", {
      clerkUserId: args.clerkUserId,
      firstName: args.firstName,
      lastName: args.lastName,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      profileImageUrl: args.profileImageUrl,
      walletBalance: 0,
      accountNumber: accountNumber,
      isVerified: false,
      verificationTier: "basic",
    });
  },
});

const getUserWallet = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // Get user by Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) return null;

    return {
      balance: user.walletBalance,
      accountNumber: user.accountNumber,
    };
  },
});

const searchUserByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Don't allow searching yourself
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (currentUser?.email.toLowerCase() === email.toLowerCase()) {
      throw new Error("Cannot send to yourself");
    }

    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();
  },
});

const sendMoney = mutation({
  args: {
    recipientEmail: v.string(),
    amount: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get sender
    const sender = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();
    if (!sender) throw new Error("Sender not found");

    // Get recipient
    const recipient = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.recipientEmail))
      .unique();
    if (!recipient) throw new Error("Recipient not found");

    // Validate balance
    if (sender.walletBalance < args.amount) {
      throw new Error("Insufficient balance");
    }

    // Perform transaction
    await ctx.db.patch(sender._id, {
      walletBalance: sender.walletBalance - args.amount,
    });

    await ctx.db.patch(recipient._id, {
      walletBalance: recipient.walletBalance + args.amount,
    });

    // Create transaction records
    const transactionId = await ctx.db.insert("transactions", {
      userId: sender._id,
      transactionType: "send",
      title: `Sent to ${recipient.fullName}`,
      amount: args.amount,
      description: args.note,
      recipientType: "user",
      recipientId: recipient._id,
    });

    await ctx.db.insert("transactions", {
      userId: recipient._id,
      transactionType: "receive",
      title: `Received from ${sender.fullName}`,
      amount: args.amount,
      description: args.note,
      recipientType: "user",
      recipientId: sender._id,
    });

    return transactionId;
  },
});

const getRecentRecipients = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) return [];

    // Get last 5 send transactions
    const sendTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("transactionType"), "send"))
      .order("desc")
      .take(5);

    // Process recipients with proper type handling
    const recipients = await Promise.all(
      sendTransactions.map(async (tx) => {
        if (tx.recipientType !== "user" || !tx.recipientId) return null;

        // Handle both string and Id types
        const recipientId =
          typeof tx.recipientId === "string"
            ? ctx.db.normalizeId("users", tx.recipientId)
            : tx.recipientId;

        if (!recipientId) return null;

        const recipient = await ctx.db.get(recipientId);
        if (!recipient || !("fullName" in recipient)) return null;

        return {
          id: recipient._id.toString(),
          name: recipient.fullName,
          email: recipient.email,
          avatar: recipient.profileImageUrl || null,
        };
      })
    );

    // Filter and deduplicate
    return recipients
      .filter((r): r is NonNullable<(typeof recipients)[0]> => r !== null)
      .filter((r, i, arr) => arr.findIndex((t) => t.id === r.id) === i)
      .slice(0, 5);
  },
});

const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", identity.subject))
      .unique();
  },
});

export {
  createUser,
  getCurrentUser,
  getRecentRecipients,
  getUserWallet,
  searchUserByEmail,
  sendMoney
};

