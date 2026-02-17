import { api } from "@/convex/_generated/api";
import { Recipe } from "@/types/recipe";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";

export default function usePublicRecipes() {
  const { isSignedIn } = useAuth();

  const AllSharedRecipes = useQuery(api.recipes.listAllRecipes) || [];
  const shareRecipe = useMutation(api.recipes.shareRecipe);

  const isAlreadyShared = (recipeId: number) => {
    return AllSharedRecipes.some((f) => f.recipeId === recipeId);
  };

  const toggleShare = async (recipe: Recipe) => {
    // giris yapilmamis ise
    if (!isSignedIn) {
      alert("Lütfen tarifi paylaşmak için giriş yapın.");
      return;
    }

    // tarif zaten paylasilmis ise
    if (isAlreadyShared(recipe.id)) {
      return;
    } else {
      await shareRecipe({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeData: JSON.stringify(recipe),
      });
    }
  };

  return { AllSharedRecipes, toggleShare, isAlreadyShared };
}
