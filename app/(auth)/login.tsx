import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* TITLE */}
        <Text style={styles.appName}>Akıllı Mutfak</Text>
        <Text style={styles.tagLine}>
          Tarif asistanınıza erişmek için tek tıkla giriş yapın.
        </Text>

        {/* LOGIN SECTION */}
        <View style={styles.loginSection}>
          <TouchableOpacity
            style={styles.googleButton}
            activeOpacity={0.7}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.googleIconContainer}>
              <Ionicons name="logo-google" size={20} color={COLORS.secondary} />
            </View>
            <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        {/* POLICY SECTION */}
        <View style={styles.policySection}>
          <Text style={styles.policySectionText}>
            Devam ederek{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Kullanım Koşulları{" "}
            </Text>
            ve
            <Text style={{ textDecorationLine: "underline" }}>
              {" "}
              Gizlilik Politikası&apos;nı{" "}
            </Text>
            kabul etmiş olursunuz.
          </Text>
        </View>
      </View>
    </View>
  );
}
