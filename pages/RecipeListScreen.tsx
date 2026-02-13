import { COLORS } from "@/constants/theme";
import useFavorites from "@/hooks/useFavorites";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
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
}

export default function RecipeListScreen({
  recipes,
  detectedIngredients,
  onReset,
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
            scrollEnabled={false} // Since clear parent creates scroll
          />
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Recipe Detail Modal */}
      <Modal
        visible={!!selectedRecipe}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedRecipe(null)}
      >
        {selectedRecipe && (
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setSelectedRecipe(null)}
                  style={styles.modalCloseButton}
                >
                  <Ionicons name="close" size={24} color={COLORS.secondary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => selectedRecipe && toggleFavorite(selectedRecipe)}
                >
                  <Ionicons
                    name={
                      selectedRecipe && isFavorite(selectedRecipe.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalCategory}>{selectedRecipe.category}</Text>
              <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
              
              <View style={styles.modalMetaRow}>
                <View style={styles.modalMetaItem}>
                  <Ionicons name="time" size={20} color={COLORS.primary} />
                  <Text style={styles.modalMetaText}>{selectedRecipe.prepTime}</Text>
                </View>
                <View style={styles.modalMetaItem}>
                  <Ionicons name="flame" size={20} color={COLORS.primary} />
                  <Text style={styles.modalMetaText}>{selectedRecipe.calories}</Text>
                </View>
              </View>

              <Text style={styles.modalDescription}>
                {selectedRecipe.description}
              </Text>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Malzemeler</Text>
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <View key={idx} style={styles.instructionRow}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.instructionText}>{ing}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Hazırlanışı</Text>
                {selectedRecipe.instructions.map((inst, idx) => (
                  <View key={idx} style={styles.instructionRow}>
                    <Text style={styles.instructionIndex}>{idx + 1}.</Text>
                    <Text style={styles.instructionText}>{inst}</Text>
                  </View>
                ))}
              </View>
              
              <View style={{ height: 40 }} />
            </ScrollView>
            
            {/* Fixed Bottom Action if needed */}
          </View>
        )}
      </Modal>
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  modalCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 16,
  },
  modalMetaRow: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 20,
  },
  modalMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalMetaText: {
    fontSize: 16,
    color: COLORS.darkgray,
    fontWeight: "500",
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.darkgray,
    lineHeight: 24,
    marginBottom: 32,
    fontStyle: "italic",
  },
  modalSection: {
    marginBottom: 32,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 16,
  },
  instructionRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 8,
    marginRight: 12,
  },
  instructionIndex: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    width: 24,
    marginRight: 8,
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.secondary,
    lineHeight: 24,
    flex: 1,
  },
});
