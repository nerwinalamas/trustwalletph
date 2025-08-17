import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: COLORS.background.main,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="privacy" />
        <Stack.Screen name="account-limits" />
        <Stack.Screen name="help-center" />
        <Stack.Screen name="about" />
      </Stack>
    </View>
  );
}
