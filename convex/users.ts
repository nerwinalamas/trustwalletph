import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create a new task with the given text
export const createUser = mutation({
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
      currency: "PHP",
      accountNumber: accountNumber,
      isVerified: false,
    });
  },
});

function generateAccountNumber() {
  const randomDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `TW-${randomDigits.slice(0, 4)}-${randomDigits.slice(4)}`;
}
