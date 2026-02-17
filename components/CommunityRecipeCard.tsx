import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/communityRecipes.styles";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CommunityRecipeCardProps {
  item: {
    _id: string;
    recipeData: string;
    recipeTitle: string;
  };
  onPress: (recipe: Recipe) => void;
}

export default function CommunityRecipeCard({
  item,
  onPress,
}: CommunityRecipeCardProps) {
  // Parse the recipe data safely
  let recipe: Recipe;
  try {
    recipe = JSON.parse(item.recipeData);
  } catch (e) {
    console.error("Failed to parse recipe data for item:", item._id);
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => onPress(recipe)}
      activeOpacity={0.9}
    >
      <View style={styles.recipeHeader}>
        <Text style={styles.recipeCategory}>{recipe.category}</Text>
        <View style={styles.recipeMetaContainer}>
          <Ionicons name="time-outline" size={14} color={COLORS.darkgray} />
          <Text style={styles.recipeMetaText}>{recipe.prepTime}</Text>
        </View>
      </View>

      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeDescription} numberOfLines={2}>
        {recipe.description}
      </Text>
    </TouchableOpacity>
  );
}
