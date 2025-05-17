import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Clerk user ID (from authentication)
    clerkUserId: v.string(),

    // User profile information
    firstName: v.string(),
    lastName: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),

    // Wallet information
    walletBalance: v.number(), // in smallest currency unit (e.g., cents)
    accountNumber: v.string(), // e.g., "•••• 4832"

    // Security
    isVerified: v.boolean(),
  })
    .index("by_clerk_user", ["clerkUserId"])
    .index("by_email", ["email"]),

  transactions: defineTable({
    // User reference
    userId: v.id("users"), // Owner of this transaction record

    // Transaction Type
    transactionType: v.union(
      v.literal("receive"), // Money received
      v.literal("send"), // Money sent (to user or bill)
      v.literal("bill") // Bill payment
    ),

    // Transaction details
    title: v.string(),
    amount: v.number(),
    description: v.optional(v.string()),

    // Recipient Handling (Improved)
    recipientType: v.optional(
      v.union(
        v.literal("user"), // When sending to another user
        v.literal("bill") // When paying bills
      )
    ),
    recipientId: v.optional(
      v.union(
        v.id("users"), // For user transfers
        v.string() // For bill references
      )
    ),
  })
    .index("by_user", ["userId"])
    .index("by_recipient", ["recipientType", "recipientId"]),

  cards: defineTable({
    // User reference
    userId: v.id("users"),

    // Card details
    type: v.union(v.literal("credit"), v.literal("debit")),
    lastFourDigits: v.string(), // e.g., "4832"
    cardNetwork: v.union(
      v.literal("visa"),
      v.literal("mastercard"),
      v.literal("amex"),
      v.literal("discover")
    ),
    cardHolderName: v.string(),
    expiryDate: v.string(), // "MM/YY" format

    // Metadata
    isDefault: v.boolean(),
  }).index("by_user", ["userId"]),

  bankAccounts: defineTable({
    // User reference
    userId: v.id("users"),

    // Bank details
    bankName: v.string(),
    accountNumber: v.string(),
    accountName: v.string(),
    accountType: v.union(
      v.literal("savings"),
      v.literal("checking"),
      v.literal("current")
    ),

    // Verification status
    isVerified: v.boolean(),
    verifiedAt: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  qrCodes: defineTable({
    // User reference
    userId: v.id("users"),

    // QR code data
    code: v.string(), // unique QR code identifier
    isActive: v.boolean(),
  })
    .index("by_code", ["code"])
    .index("by_user", ["userId"]),

  notifications: defineTable({
    // User reference
    userId: v.id("users"),

    // Notification details
    title: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("transaction"),
      v.literal("security"),
      v.literal("promotion"),
      v.literal("system")
    ),

    // Status
    isRead: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_unread", ["userId", "isRead"]),
});
