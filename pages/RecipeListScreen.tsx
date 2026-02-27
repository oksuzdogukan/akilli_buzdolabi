import RecipeDetailModal from "@/components/RecipeDetailModal";
import RecipeSkeletonCard from "@/components/RecipeSkeletonCard";
import { COLORS } from "@/constants/theme";
import useFavorites from "@/hooks/useFavorites";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface RecipeListScreenProps {
  recipes: Recipe[];
  detectedIngredients: string[];
  onReset: () => void;
  loading?: boolean;
}

export default function RecipeListScreen({
  recipes,
  detectedIngredients,
  onReset,
  loading,
}: RecipeListScreenProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const renderIngredient = ({ item }: { item: string }) => (
    <View style={styles.ingredientChip}>
      <Text style={styles.ingredientText}>{item}</Text>
    </View>
  );

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => setSelectedRecipe(item)}
      activeOpacity={0.9}
    >
      <View style={styles.recipeHeader}>
        <Text style={styles.recipeCategory}>{item.category}</Text>
        <View style={styles.recipeMetaContainer}>
          <Ionicons name="time-outline" size={14} color={COLORS.darkgray} />
          <Text style={styles.recipeMetaText}>{item.prepTime}</Text>
          <Text style={styles.recipeMetaDivider}>•</Text>
          <Ionicons name="flame-outline" size={14} color={COLORS.darkgray} />
          <Text style={styles.recipeMetaText}>{item.calories}</Text>
        </View>
      </View>
      
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.recipeFooter}>
        <Text style={styles.viewRecipeText}>Tarifi Gör</Text>
        <Ionicons
          name="arrow-forward-circle"
          size={24}
          color={COLORS.primary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onReset} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Önerilen Tarifler</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          /* Skeleton Loading */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarifler hazırlanıyor...</Text>
            <RecipeSkeletonCard />
            <RecipeSkeletonCard />
            <RecipeSkeletonCard />
          </View>
        ) : (
          <>
            {/* Detected Ingredients Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tespit Edilen Malzemeler</Text>
              <FlatList
                data={detectedIngredients}
                renderItem={renderIngredient}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ingredientsList}
              />
            </View>

            {/* Recipes List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sizin İçin Seçtiklerimiz</Text>
              <FlatList
                data={recipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <RecipeDetailModal
        visible={!!selectedRecipe}
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.secondary,
    marginLeft: 20,
    marginBottom: 15,
  },
  ingredientsList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  ingredientChip: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  ingredientText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeCategory: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recipeMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeMetaText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 4,
  },
  recipeMetaDivider: {
    marginHorizontal: 6,
    color: COLORS.lightgray,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: COLORS.darkgray,
    lineHeight: 20,
    marginBottom: 16,
  },
  recipeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  viewRecipeText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

