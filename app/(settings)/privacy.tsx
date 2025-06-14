import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Privacy() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    profileVisibility: true,
    hideTransactionAmounts: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFILE PRIVACY</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#e0e7ff" }]}
                >
                  <Ionicons name="person-outline" size={20} color="#1e3a8a" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Profile Visibility</Text>
                  <Text style={styles.settingDescription}>
                    Make your profile visible to other users
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.profileVisibility}
                onValueChange={() => toggleSetting("profileVisibility")}
                trackColor={{ false: "#e2e8f0", true: "#3b82f6" }}
                thumbColor={settings.profileVisibility ? "#ffffff" : "#94a3b8"}
              />
            </View>
          </View>
        </View>

        {/* Transaction Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSACTION PRIVACY</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#fef3c7" }]}
                >
                  <Ionicons name="eye-off-outline" size={20} color="#d97706" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>
                    Hide Transaction Amounts
                  </Text>
                  <Text style={styles.settingDescription}>
                    Hide amounts in transaction list
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.hideTransactionAmounts}
                onValueChange={() => toggleSetting("hideTransactionAmounts")}
                trackColor={{ false: "#e2e8f0", true: "#3b82f6" }}
                thumbColor={
                  settings.hideTransactionAmounts ? "#ffffff" : "#94a3b8"
                }
              />
            </View>
          </View>
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
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
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
  settingCard: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 4,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 18,
  },
});
