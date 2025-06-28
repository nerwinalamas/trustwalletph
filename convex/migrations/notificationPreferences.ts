import { mutation } from "../_generated/server";

export const notificationUserPreferences = mutation({
  args: {},
  handler: async (ctx) => {
    // Kunin lahat ng existing users
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      // Skip if may existing preferences na
      if (user.notificationPreferences) continue;

      await ctx.db.patch(user._id, {
        notificationPreferences: {
          pushEnabled: true,
          transactionAlerts: true,
          soundEnabled: true,
          vibrationEnabled: true,
          quietHoursEnabled: false,
          quietHoursStart: "22:00",
          quietHoursEnd: "08:00",
        },
      });
    }

    return { success: true };
  },
});
