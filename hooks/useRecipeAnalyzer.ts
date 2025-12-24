import { api } from "@/convex/_generated/api";
import { Recipe } from "@/types/recipe";
import { useAction } from "convex/react";
import { CameraView } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { RefObject, useState } from "react";
import { Alert } from "react-native";

export default function useRecipeAnalyzer() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const analyzeImage = useAction(api.gemini.analyzeImage); // gemini function from convex

  const takePicture = async (cameraRef: RefObject<CameraView>) => {
    if (cameraRef.current) {
      if (!cameraRef.current) return;

      try {
        setLoading(true);

        // take picture
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
        });

        if (!photo?.uri) {
          throw new Error("Fotograf cekilemedi");
        }

        // optimize picture
        const optimiziedPicture = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.6, format: SaveFormat.JPEG, base64: true }
        );

        // convex action, ask AI
        if (optimiziedPicture.base64) {
          const result = await analyzeImage({
            imageBase64: optimiziedPicture.base64,
          });

          // show results
          setRecipes(result.recipes as Recipe[]);
        } else {
          console.log("optimize edilirken hata");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Tarif olusturulurken hata");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetRecipes = () => setRecipes(null);

  return {
    recipes,
    loading,
    takePicture,
    resetRecipes,
  };
}
