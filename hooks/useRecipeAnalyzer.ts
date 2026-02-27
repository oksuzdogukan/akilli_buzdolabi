import { api } from "@/convex/_generated/api";
import { Recipe } from "@/types/recipe";
import { useAction } from "convex/react";
import { CameraView } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { RefObject, useState } from "react";
import { Alert } from "react-native";

export default function useRecipeAnalyzer() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<
    string[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const analyzeImage = useAction(api.groq.analyzeImageGroq); // groqAPI function from convex

  const processImageUri = async (uri: string, onSuccess?: () => void) => {
    try {
      setLoading(true);

      // optimize picture
      const optimiziedPicture = await manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.6, format: SaveFormat.JPEG, base64: true },
      );

      // convex action, ask AI
      if (optimiziedPicture.base64) {
        const result = (await analyzeImage({
          imageBase64: optimiziedPicture.base64,
        })) as unknown as { detectedIngredients: string[]; recipes: Recipe[] };

        // AI her seferinde id: 1, 2, 3 üretiyor — çakışmaları önlemek için benzersiz ID ata
        const timestamp = Date.now();
        const recipesWithUniqueIds = result.recipes.map((recipe, index) => ({
          ...recipe,
          id: timestamp + index,
        }));

        // show results
        setRecipes(recipesWithUniqueIds);
        setDetectedIngredients(result.detectedIngredients);

        // trigger success callback if provided
        if (onSuccess) onSuccess();
      } else {
        console.log("optimize edilirken hata");
        Alert.alert("Hata", "Görüntü işlenirken bir sorun oluştu.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Tarif oluşturulurken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async (
    cameraRef: RefObject<CameraView | null>,
    onSuccess?: () => void,
  ) => {
    if (!cameraRef.current) return;

    try {
      // take picture
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true, // we might not need base64 here anymore if processImageUri generates it from URI, but keeping standard
      });

      if (!photo?.uri) {
        throw new Error("Fotoğraf çekilemedi");
      }

      await processImageUri(photo.uri, onSuccess);
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Fotoğraf çekilirken bir sorun oluştu.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: (ImagePicker as any).MediaType
          ? (ImagePicker as any).MediaType.Images
          : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Users often want to crop
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await processImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Galeri açılırken bir sorun oluştu.");
    }
  };

  const resetRecipes = () => {
    setRecipes(null);
    setDetectedIngredients(null);
  };

  return {
    recipes,
    detectedIngredients,
    loading,
    takePicture,
    pickImage,
    resetRecipes,
  };
}
