import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/index.styles";
import { useAction } from "convex/react";
import { useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  // STATE MANAGMENT
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);

  const cameraRef = useRef(null);
  const analyzeImage = useAction(api.gemini.analyzeImage); // gemini function from convex

  // Camera permissions
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.cameraPermissionContainer}>
        <Text>Kamera izni gerekiyor</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <Text>index</Text>
    </View>
  );
}
