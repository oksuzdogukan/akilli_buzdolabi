import { api } from "@/convex/_generated/api";
import { Recipe } from "@/types/recipe";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";

export default function useFavorites() {
  const { isSignedIn } = useAuth();
  
  const addFavorite = useMutation(api.favorites.addFavorite);
  const removeFavorite = useMutation(api.favorites.removeFavorite);
  const favorites = useQuery(api.favorites.listFavorites) || []; // Default empty array

  const isFavorite = (recipeId: number) => {
    return favorites.some((f) => f.recipeId === recipeId);
  };

  const toggleFavorite = async (recipe: Recipe) => {
    if (!isSignedIn) {
      // Maybe show login prompt? For now, imply login requirement
      alert("Lütfen favorilere eklemek için giriş yapın.");
      return;
    }

    if (isFavorite(recipe.id)) {
      await removeFavorite({ recipeId: recipe.id });
    } else {
      await addFavorite({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeData: JSON.stringify(recipe),
      });
    }
  };

  return {
    favorites, // This returns list of favorites with parsed recipe object
    isFavorite,
    toggleFavorite,
  };
}
