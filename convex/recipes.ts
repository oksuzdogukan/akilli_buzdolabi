import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listAllRecipes = query({
    args: {},
    handler: async (ctx) => {
        const recipes = await ctx.db.query("public_recipes").collect();
        return recipes;
    },
});

export const shareRecipe = mutation({
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

        const existing = await ctx.db
            .query("public_recipes")
            .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
            .first();

        if (existing) {
            return existing._id;
        }

        const id = await ctx.db.insert("public_recipes", {
            userId,
            recipeId: args.recipeId,
            recipeTitle: args.recipeTitle,
            recipeData: args.recipeData,
        });

        return id;
    },
});