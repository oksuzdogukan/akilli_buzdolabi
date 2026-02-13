import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  favorites: defineTable({
    userId: v.string(),
    recipeId: v.number(), // Generated ID from AI
    recipeTitle: v.string(),
    recipeData: v.string(), // JSON stringified recipe object
  })
    .index("by_user", ["userId"])
    .index("by_user_recipe", ["userId", "recipeId"]),
});
