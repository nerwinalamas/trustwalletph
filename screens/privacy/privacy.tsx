import BackHeader from "@/components/back-header";
import { COLORS } from "@/constants/colors";
import { usePrivacyStore } from "@/stores/privacy-store";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function PrivacyScreen() {
  const { settings, toggleSetting } = usePrivacyStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms delay (half second)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Privacy" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
    backgroundColor: COLORS.background.main,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    color: COLORS.text.tertiary,
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
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    lineHeight: 18,
  },
});
