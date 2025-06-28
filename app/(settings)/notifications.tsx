import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Notifications() {
  const router = useRouter();

  // Notification settings state
  const [settings, setSettings] = useState({
    pushNotifications: true,
    transactionAlerts: true,
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderToggleItem = (
    key: keyof typeof settings,
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUIET HOURS</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="moon-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Do Not Disturb</Text>
                <Text style={styles.menuSubtitle}>10:00 PM - 8:00 AM</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
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
});
