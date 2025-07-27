import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Security() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "You will be redirected to change your password",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => console.log("Change password") },
      ]
    );
  };

  const handleSetupTwoFactor = () => {
    Alert.alert(
      "Two-Factor Authentication",
      "Enable two-factor authentication for extra security",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Set Up", onPress: () => setTwoFactorEnabled(true) },
      ]
    );
  };

  const handleViewSessions = () => {
    console.log("View active sessions");
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Security" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT SECURITY</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleChangePassword}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="key-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Change Password</Text>
                <Text style={styles.menuSubtitle}>
                  Update your account password
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="finger-print-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Biometric Authentication</Text>
                <Text style={styles.menuSubtitle}>
                  Use fingerprint or face ID
                </Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                thumbColor={biometricEnabled ? "#ffffff" : "#ffffff"}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={twoFactorEnabled ? undefined : handleSetupTwoFactor}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Two-Factor Authentication</Text>
                <Text style={styles.menuSubtitle}>
                  {twoFactorEnabled ? "Enabled" : "Add extra security layer"}
                </Text>
              </View>
              {twoFactorEnabled ? (
                <View style={styles.enabledBadge}>
                  <Text style={styles.enabledText}>Enabled</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Login & Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOGIN & ACCESS</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleViewSessions}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="desktop-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Active Sessions</Text>
                <Text style={styles.menuSubtitle}>
                  Manage your active logins
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Login Alerts</Text>
                <Text style={styles.menuSubtitle}>
                  Get notified of new logins
                </Text>
              </View>
              <Switch
                value={loginAlertsEnabled}
                onValueChange={setLoginAlertsEnabled}
                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                thumbColor={loginAlertsEnabled ? "#ffffff" : "#ffffff"}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="time-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Login History</Text>
                <Text style={styles.menuSubtitle}>
                  View your recent login activity
                </Text>
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
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
  icon: {
    backgroundColor: "#e0e7ff",
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
  enabledBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  enabledText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#16a34a",
  },
});
