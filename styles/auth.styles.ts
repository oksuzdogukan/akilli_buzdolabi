import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  brandSection: {
    alignItems: "center",
    marginTop: height * 0.2,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: COLORS.light,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  appName: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: COLORS.secondary,
    marginBottom: 10,
  },
  tagLine: {
    textAlign: "center",
    maxWidth: 280,
    fontSize: 16,
    color: COLORS.darkgray,
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
    marginTop: 50,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    maxWidth: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  googleIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  policySection: {
    width: "100%",
    maxWidth: 250,
    alignItems: "center",
  },
  policySectionText: {
    color: COLORS.lightgray,
    fontSize: 12,
    textAlign: "center",
  },
});
