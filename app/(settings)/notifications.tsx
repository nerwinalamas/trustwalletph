import BackHeader from "@/components/back-header";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

interface NotificationToggleSettings {
  pushNotifications: boolean;
  transactionAlerts: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHoursEnabled: boolean;
}

interface NotificationTimeSettings {
  quietHoursStart: string;
  quietHoursEnd: string;
}

type NotificationSettings = NotificationToggleSettings &
  NotificationTimeSettings;

export default function Notifications() {
  const preferences = useQuery(api.notifications.getNotificationPreferences);
  const updatePreferences = useMutation(
    api.notifications.updateNotificationPreferences
  );

  // Notification settings state
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    transactionAlerts: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  });

  useEffect(() => {
    if (preferences) {
      setSettings({
        pushNotifications: preferences.pushEnabled,
        transactionAlerts: preferences.transactionAlerts,
        soundEnabled: preferences.soundEnabled,
        vibrationEnabled: preferences.vibrationEnabled,
        quietHoursEnabled: preferences.quietHoursEnabled,
        quietHoursStart: preferences.quietHoursStart,
        quietHoursEnd: preferences.quietHoursEnd,
      });
    }
  }, [preferences]);

  const toggleSetting = async (key: keyof typeof settings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(newSettings);

    await updatePreferences({
      preferences: {
        pushEnabled: newSettings.pushNotifications,
        transactionAlerts: newSettings.transactionAlerts,
        soundEnabled: newSettings.soundEnabled,
        vibrationEnabled: newSettings.vibrationEnabled,
        quietHoursEnabled: newSettings.quietHoursEnabled,
        quietHoursStart: newSettings.quietHoursStart,
        quietHoursEnd: newSettings.quietHoursEnd,
      },
    });
  };

  // const handleQuietHoursChange = async (start: string, end: string) => {
  //   const newSettings = {
  //     ...settings,
  //     quietHoursStart: start,
  //     quietHoursEnd: end,
  //   };

  //   setSettings(newSettings);

  //   await updatePreferences({
  //     preferences: {
  //       pushEnabled: newSettings.pushNotifications,
  //       transactionAlerts: newSettings.transactionAlerts,
  //       soundEnabled: newSettings.soundEnabled,
  //       vibrationEnabled: newSettings.vibrationEnabled,
  //       quietHoursEnabled: newSettings.quietHoursEnabled,
  //       quietHoursStart: newSettings.quietHoursStart,
  //       quietHoursEnd: newSettings.quietHoursEnd,
  //     },
  //   });
  // };

  const renderToggleItem = (
    key: keyof NotificationToggleSettings,
    title: string,
    subtitle: string,
    iconName: keyof typeof Ionicons.glyphMap,
    isEnabled: boolean = true
  ) => (
    <View style={[styles.toggleItem, !isEnabled && styles.disabledItem]}>
      <View style={styles.toggleLeft}>
        <View style={[styles.toggleIcon, styles.icon]}>
          <Ionicons
            name={iconName}
            size={20}
            color={isEnabled ? "#1e3a8a" : "#94a3b8"}
          />
        </View>
        <View style={styles.toggleTextContainer}>
          <Text style={[styles.toggleTitle, !isEnabled && styles.disabledText]}>
            {title}
          </Text>
          <Text
            style={[styles.toggleSubtitle, !isEnabled && styles.disabledText]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSetting(key)}
        trackColor={{ false: "#e2e8f0", true: "#3b82f6" }}
        thumbColor={settings[key] ? "#ffffff" : "#94a3b8"}
        disabled={!isEnabled}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <BackHeader title="Notifications" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL NOTIFICATIONS</Text>

          {renderToggleItem(
            "pushNotifications",
            "Push Notifications",
            "Receive notifications on your device",
            "phone-portrait-outline"
          )}
        </View>

        {/* Transaction & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSACTION</Text>

          {renderToggleItem(
            "transactionAlerts",
            "Transaction Alerts",
            "Get notified for all transactions",
            "card-outline",
            settings.pushNotifications
          )}
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATION PREFERENCES</Text>

          {renderToggleItem(
            "soundEnabled",
            "Sound",
            "Play sound for notifications",
            "volume-high-outline",
            settings.pushNotifications
          )}

          {renderToggleItem(
            "vibrationEnabled",
            "Vibration",
            "Vibrate for notifications",
            "phone-portrait-outline",
            settings.pushNotifications
          )}
        </View>

        {/* Quiet Hours */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUIET HOURS</Text>

          {renderToggleItem(
            "quietHoursEnabled",
            "Do Not Disturb",
            "Silence notifications during set hours",
            "moon-outline"
          )}

          {settings.quietHoursEnabled && (
            <View style={styles.timePickerContainer}>
              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => showTimePicker("start")}
              >
                <Text>Start: {settings.quietHoursStart}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => showTimePicker("end")}
              >
                <Text>End: {settings.quietHoursEnd}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 12,
  },
  toggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  disabledItem: {
    opacity: 0.5,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    backgroundColor: "#e0e7ff",
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  disabledText: {
    color: "#94a3b8",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timePicker: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: "48%",
  },
});
