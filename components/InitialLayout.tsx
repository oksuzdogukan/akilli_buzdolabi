import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth(); // clerk yuklendimi,  kullanici onceden giris yapmis mi

  const segments = useSegments(); // suan hangi screen de oldugunu almak icin (or: /(auth)/login)

  const router = useRouter(); // navigation icin

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && inAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segments]); // biri degisirse useEffect tekrar calisir

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
