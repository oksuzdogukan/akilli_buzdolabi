import { COLORS } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function RecipeSkeletonCard() {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.card}>
      {/* Header: category + meta */}
      <View style={styles.header}>
        <Animated.View
          style={[styles.skeletonBlock, styles.category, { opacity: pulseAnim }]}
        />
        <Animated.View
          style={[styles.skeletonBlock, styles.meta, { opacity: pulseAnim }]}
        />
      </View>

      {/* Title */}
      <Animated.View
        style={[styles.skeletonBlock, styles.title, { opacity: pulseAnim }]}
      />

      {/* Description line 1 */}
      <Animated.View
        style={[styles.skeletonBlock, styles.descLine, { opacity: pulseAnim }]}
      />
      {/* Description line 2 */}
      <Animated.View
        style={[
          styles.skeletonBlock,
          styles.descLine,
          { width: "60%", opacity: pulseAnim },
        ]}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Animated.View
          style={[styles.skeletonBlock, styles.footerBlock, { opacity: pulseAnim }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  skeletonBlock: {
    backgroundColor: COLORS.lightgray || "#E0E0E0",
    borderRadius: 6,
  },
  category: {
    width: 70,
    height: 14,
    borderRadius: 4,
  },
  meta: {
    width: 90,
    height: 14,
    borderRadius: 4,
  },
  title: {
    width: "75%",
    height: 20,
    marginBottom: 10,
    borderRadius: 4,
  },
  descLine: {
    width: "100%",
    height: 14,
    marginBottom: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  footerBlock: {
    width: 100,
    height: 24,
    borderRadius: 12,
  },
});
