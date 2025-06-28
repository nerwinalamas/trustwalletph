import { mutation } from "../_generated/server";

export const addPushTokenField = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      if (user.pushToken === undefined) {
        await ctx.db.patch(user._id, {
          pushToken: "",
        });
      }
    }

    return {
      success: true,
      totalUsers: users.length,
    };
  },
});
