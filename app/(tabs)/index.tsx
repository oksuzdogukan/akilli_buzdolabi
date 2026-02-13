import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Hooks
import { COLORS } from "@/constants/theme";
import RecipeListScreen from "@/pages/RecipeListScreen";
import { styles } from "@/styles/index.styles";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import useCameraSystem from "../../hooks/useCameraSystem";
import useRecipeAnalyzer from "../../hooks/useRecipeAnalyzer";

// Akis Sirasi => Recipes => Camera => Main Screen

export default function Index() {
  
  // call hooks

  const { user } = useUser();

  const { isCameraOpen, cameraRef, handleCameraPermission, closeCamera } =
    useCameraSystem();
  const {
    recipes,
    detectedIngredients,
    loading,
    takePicture,
    pickImage,
    resetRecipes,
  } = useRecipeAnalyzer();

  const handleCapture = () => {
    takePicture(cameraRef, () => closeCamera()); // close camera after taking picture
  };

  const handleNewScan = () => {
    resetRecipes();
    closeCamera();
  };

  // CAMERA MODE
  if (isCameraOpen) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
          {/* Kapatma Butonu */}
          <TouchableOpacity
            onPress={closeCamera}
            style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}
          >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>

          {/* Alt Kontrol Alanı */}
          <View
            style={{
              position: "absolute",
              bottom: 90,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            {loading ? (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  padding: 20,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: "white", marginTop: 10 }}>
                  Mutfak Analiz Ediliyor...
                </Text>
              </View>
            ) : (
              <TouchableOpacity onPress={handleCapture}>
                {/* Deklanşör Görünümü */}
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      borderWidth: 2,
                      borderColor: "#000",
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </CameraView>
      </View>
    );
  }

  // Recipes Page
  if (recipes) {
    return (
      <RecipeListScreen
        recipes={recipes}
        detectedIngredients={detectedIngredients || []}
        onReset={resetRecipes}
      />
    );
  }

  // MAIN SCREEN
  return (
    <View style={styles.container}>
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
            style={[styles.actionButtonMain, loading && { opacity: 0.7 }]}
            onPress={handleCameraPermission}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.actionButtonMainText}>Buzdolabını Tara</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButtonSecondary, loading && { opacity: 0.7 }]}
            onPress={pickImage}
            disabled={loading}
          >
            <Ionicons name="images" size={24} color={COLORS.primary} />
            <Text style={styles.actionButtonSecondaryText}>Galeriden Seç</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
