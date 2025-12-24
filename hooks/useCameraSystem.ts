import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert } from "react-native";

export default function useCameraSystem() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  // Camera permission
  const handleCameraPermission = async () => {
    if (!permission) return; // if user did not give permission

    // user has already given permission
    if (permission.granted) {
      setIsCameraOpen(true);
      return;
    }

    // if user did not give permisson, request permission
    const result = await requestPermission();
    if (result.granted) {
      setIsCameraOpen(true);
    } else {
      Alert.alert(
        "İzin Gerekli",
        "Buzdolabını tarayabilmemiz için kamera izni gerekli."
      );
    }
  };

  const closeCamera = () => setIsCameraOpen(false);

  return {
    permission,
    isCameraOpen,
    cameraRef,
    handleCameraPermission,
    closeCamera,
  };
}
