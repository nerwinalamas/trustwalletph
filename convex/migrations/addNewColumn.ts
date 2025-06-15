import { mutation } from "../_generated/server";

export const migrateTiers = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    await Promise.all(
      users.map((user) =>
        ctx.db.patch(user._id, {
          verificationTier: user.isVerified ? "verified" : "basic",
        })
      )
    );
  },
});

// NOTE: 
// when adding new column make it first optionnal
// and then create a migration function
// and then run the command "npx convex run migrations/addNewColumn:migrateTiers"

// "migrations" - name of the folder
// "addNewColumn" - name of the file (addNewColumn.ts)
// "migrateTiers" - name of the function

// make sure the "npx convex dev" is running in another terminal to make this work

// when you successfully run the migration function you can now update the column and make it required