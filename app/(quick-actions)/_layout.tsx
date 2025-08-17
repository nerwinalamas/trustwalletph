import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QuickActionsLayout() {
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
        <Stack.Screen name="send" />
        <Stack.Screen name="receive" />
        <Stack.Screen name="scan" />
        <Stack.Screen name="pay" />
      </Stack>
    </View>
  );
}
