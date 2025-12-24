import InitialLayout from "@/components/InitialLayout";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { FC, PropsWithChildren } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
  {
    unsavedChangesWarning: false,
  }
);

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default function RootLayout() {
  return (
    <Providers>
      <InitialLayout />
    </Providers>
  );
}
