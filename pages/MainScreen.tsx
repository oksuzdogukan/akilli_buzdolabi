import { COLORS } from "@/constants/theme";
import useCameraSystem from "@/hooks/useCameraSystem";
import useRecipeAnalyzer from "@/hooks/useRecipeAnalyzer";
import { styles } from "@/styles/index.styles";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MainScreen() {
  // call hooks
  const { user } = useUser();

  const { loading, pickImage } = useRecipeAnalyzer();
  const { handleCameraPermission } = useCameraSystem();

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
                <Text style={styles.actionButtonMainText}>
                  Buzdolabını Tara
                </Text>
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
