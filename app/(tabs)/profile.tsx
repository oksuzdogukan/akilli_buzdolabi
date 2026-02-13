import { COLORS } from "@/constants/theme";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {user?.fullName || user?.firstName}
          </Text>
          <Text style={styles.email}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={24} color={COLORS.secondary} />
            <Text style={styles.actionText}>Ayarlar</Text>
            <Ionicons name="chevron-forward" size={24} color={COLORS.lightgray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
             <Ionicons name="help-circle-outline" size={24} color={COLORS.secondary} />
            <Text style={styles.actionText}>Yardım</Text>
            <Ionicons name="chevron-forward" size={24} color={COLORS.lightgray} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.signOutButton]}
            onPress={() => signOut()}
          >
            <Ionicons name="log-out-outline" size={24} color="#ff4444" />
            <Text style={[styles.actionText, { color: "#ff4444" }]}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  content: {
    padding: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: COLORS.darkgray,
  },
  actions: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  signOutButton: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  actionText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: "500",
  },
});
