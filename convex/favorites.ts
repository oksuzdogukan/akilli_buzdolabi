import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addFavorite = mutation({
  args: {
    recipeId: v.number(),
    recipeTitle: v.string(),
    recipeData: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Giris yapmalisiniz");
    }

    const userId = identity.subject;

    // Check if already exists
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_recipe", (q) =>
        q.eq("userId", userId).eq("recipeId", args.recipeId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    const id = await ctx.db.insert("favorites", {
      userId,
      recipeId: args.recipeId,
      recipeTitle: args.recipeTitle,
      recipeData: args.recipeData,
    });

    return id;
  },
});

export const removeFavorite = mutation({
  args: {
    recipeId: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Giris yapmalisiniz");
    }

    const userId = identity.subject;

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_recipe", (q) =>
        q.eq("userId", userId).eq("recipeId", args.recipeId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const listFavorites = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const userId = identity.subject;

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return favorites.map((f) => ({
      ...f,
      recipe: JSON.parse(f.recipeData),
    }));
  },
});
