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
        backgroundColor: "#f8fafc",
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="security" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="language" />
        <Stack.Screen name="payment-method" />
        <Stack.Screen name="account-limits" />
        <Stack.Screen name="help-center" />
        <Stack.Screen name="about" />
      </Stack>
    </View>
  );
}
