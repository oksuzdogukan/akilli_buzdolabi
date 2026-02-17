import { COLORS } from "@/constants/theme";
import useFavorites from "@/hooks/useFavorites";
import { styles } from "@/styles/recipeDetailModal.styles";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface RecipeDetailModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

import usePublicRecipes from "@/hooks/usePublicRecipes";

export default function RecipeDetailModal({
  visible,
  recipe,
  onClose,
}: RecipeDetailModalProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleShare, isAlreadyShared } = usePublicRecipes();

  if (!recipe) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Ionicons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleShare(recipe)}
              >
                <Ionicons
                  name={isAlreadyShared(recipe.id) ? "share-social" : "share-social-outline"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(recipe)}
              >
                <Ionicons
                  name={isFavorite(recipe.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.modalCategory}>{recipe.category}</Text>
          <Text style={styles.modalTitle}>{recipe.title}</Text>

          <View style={styles.modalMetaRow}>
            <View style={styles.modalMetaItem}>
              <Ionicons name="time" size={20} color={COLORS.primary} />
              <Text style={styles.modalMetaText}>{recipe.prepTime}</Text>
            </View>
            <View style={styles.modalMetaItem}>
              <Ionicons name="flame" size={20} color={COLORS.primary} />
              <Text style={styles.modalMetaText}>{recipe.calories}</Text>
            </View>
          </View>

          <Text style={styles.modalDescription}>{recipe.description}</Text>

          <View style={styles.modalSection}>
            <Text style={styles.modalSectionTitle}>Malzemeler</Text>
            {recipe.ingredients.map((ing, idx) => (
              <View key={idx} style={styles.instructionRow}>
                <View style={styles.bulletPoint} />
                <Text style={styles.instructionText}>{ing}</Text>
              </View>
            ))}
          </View>

          <View style={styles.modalSection}>
            <Text style={styles.modalSectionTitle}>Hazırlanışı</Text>
            {recipe.instructions.map((inst, idx) => (
              <View key={idx} style={styles.instructionRow}>
                <Text style={styles.instructionIndex}>{idx + 1}.</Text>
                <Text style={styles.instructionText}>{inst}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}
