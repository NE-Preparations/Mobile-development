import { StatusBar } from "expo-status-bar";
import BottomTabBar from "../components/BottomTabBar";
import { Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Background } from "@react-navigation/elements";

export default function RootLaout() {
  const pathname = usePathname();

  const shouldShowBottomTab =
    pathname !== "/" && !pathname.includes("/product");

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f3f4f6" },
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="home" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="product/[id]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="product/create" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
      {shouldShowBottomTab && <BottomTabBar />}
    </SafeAreaProvider>
  );
}
