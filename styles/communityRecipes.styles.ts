import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20, // Reduced padding
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recipeCategory: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  recipeMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  recipeMetaText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 4,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 6,
    paddingRight: 50, // Space for heart button
  },
  recipeDescription: {
    fontSize: 14,
    color: COLORS.darkgray,
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
    gap: 15,
  },
});
