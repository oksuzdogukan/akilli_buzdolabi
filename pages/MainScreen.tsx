import LinkCommunityRecipeCard from "@/components/CommunityRecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import { COLORS } from "@/constants/theme";
import usePublicRecipes from "@/hooks/usePublicRecipes";
import { styles } from "@/styles/index.styles";
import { Recipe } from "@/types/recipe";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MainScreenProps {
  onOpenCamera: () => void;
  onPickImage: () => void;
}

export default function MainScreen({
  onOpenCamera,
  onPickImage,
}: MainScreenProps) {
  const { user } = useUser();
  const { AllSharedRecipes } = usePublicRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const renderHeader = () => (
    <View>
      {/* HEADER*/}
      <View style={styles.headerContainer}>
        <Ionicons name="menu" size={24} color={COLORS.secondary} />
        <Text style={styles.titleText}>Akıllı Mutfak</Text>
        <Ionicons name="notifications" size={24} color={COLORS.secondary} />
      </View>

      {/* MAIN SECTION */}
      <View style={styles.mainContainer}>
        {/* Profile Picture */}
        <View>
          <Image
            style={styles.profilePicture}
            source={{ uri: user?.imageUrl }}
          />
        </View>

        {/* HELLO TEXT SECTION */}
        <View style={styles.helloTextContainer}>
          <Text style={styles.helloText}>Merhaba!</Text>
          <Text style={styles.helloText}>Bugün ne pişiriyoruz?</Text>
          <Text style={styles.helloSubText}>
            Buzdolabını tara, israfı önle ve elindeki malzemelerle lezzetli
            tarifler bul.
          </Text>
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.actionButtonMain}
            onPress={onOpenCamera}
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.actionButtonMainText}>
              Buzdolabını Tara
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonSecondary}
            onPress={onPickImage}
          >
            <Ionicons name="images" size={24} color={COLORS.primary} />
            <Text style={styles.actionButtonSecondaryText}>Galeriden Seç</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.secondary }}>
          Topluluk Tarifleri
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={AllSharedRecipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <LinkCommunityRecipeCard
            item={item}
            onPress={(recipe) => setSelectedRecipe(recipe)}
          />
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <RecipeDetailModal
        visible={!!selectedRecipe}
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </View>
  );
}
