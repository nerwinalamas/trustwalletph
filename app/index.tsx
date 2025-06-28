import { registerNotificationHandlers, setupNotifications } from "@/lib/notifications";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    setupNotifications();
    const cleanup = registerNotificationHandlers();
    return cleanup;
  }, []);

  return <Redirect href="/(auth)/sign-in" />;
}
