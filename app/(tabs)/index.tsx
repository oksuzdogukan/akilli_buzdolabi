import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
// Hooks
import MainScreen from "@/pages/MainScreen";
import RecipeListScreen from "@/pages/RecipeListScreen";
import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import useCameraSystem from "../../hooks/useCameraSystem";
import useRecipeAnalyzer from "../../hooks/useRecipeAnalyzer";

export default function Index() {
  // call hooks

  const { isCameraOpen, cameraRef, closeCamera, handleCameraPermission } =
    useCameraSystem();
  const {
    recipes,
    detectedIngredients,
    loading,
    takePicture,
    resetRecipes,
    pickImage,
  } = useRecipeAnalyzer();

  const handleCapture = () => {
    takePicture(cameraRef, () => closeCamera()); // close camera after taking picture
  };

  // const handleNewScan = () => {
  //   resetRecipes();
  //   closeCamera();
  // };

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
    <MainScreen
      onOpenCamera={handleCameraPermission}
      onPickImage={pickImage}
      loading={loading}
    />
  );
}
