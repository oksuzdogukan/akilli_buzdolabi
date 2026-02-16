import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  listContainer: {
    padding: 20,
    gap: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkgray,
    marginTop: 20,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20, // Reduced padding
    marginBottom: 10,
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
  removeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  // Modal Styles (copied for consistency)
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  modalCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 16,
  },
  modalMetaRow: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 20,
  },
  modalMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalMetaText: {
    fontSize: 16,
    color: COLORS.darkgray,
    fontWeight: "500",
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.darkgray,
    lineHeight: 24,
    marginBottom: 32,
    fontStyle: "italic",
  },
  modalSection: {
    marginBottom: 32,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 16,
  },
  instructionRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 8,
    marginRight: 12,
  },
  instructionIndex: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    width: 24,
    marginRight: 8,
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.secondary,
    lineHeight: 24,
    flex: 1,
  },
});
