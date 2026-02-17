import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
