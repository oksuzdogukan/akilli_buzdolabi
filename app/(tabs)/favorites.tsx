import { COLORS } from "@/constants/theme";
import useFavorites from "@/hooks/useFavorites";
import { styles } from "@/styles/favorites.styles";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const renderRecipeItem = ({ item }: { item: any }) => {
    const recipe = item.recipe as Recipe;
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => setSelectedRecipe(recipe)}
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

        <TouchableOpacity
          style={styles.removeButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
        >
          <Ionicons name="heart" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favori Tariflerim</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="heart-dislike-outline"
            size={64}
            color={COLORS.lightgray}
          />
          <Text style={styles.emptyText}>Henüz favori tarifiniz yok.</Text>
          <Text style={styles.emptySubText}>
            Beğendiğiniz tarifleri kalp ikonuna tıklayarak buraya
            ekleyebilirsiniz.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}

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
                  onPress={() => {
                    toggleFavorite(selectedRecipe);
                    setSelectedRecipe(null); // Close modal on remove? Optional.
                  }}
                >
                  <Ionicons name="heart" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalCategory}>
                {selectedRecipe.category}
              </Text>
              <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>

              <View style={styles.modalMetaRow}>
                <View style={styles.modalMetaItem}>
                  <Ionicons name="time" size={20} color={COLORS.primary} />
                  <Text style={styles.modalMetaText}>
                    {selectedRecipe.prepTime}
                  </Text>
                </View>
                <View style={styles.modalMetaItem}>
                  <Ionicons name="flame" size={20} color={COLORS.primary} />
                  <Text style={styles.modalMetaText}>
                    {selectedRecipe.calories}
                  </Text>
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
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}
