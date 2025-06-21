import { api } from "@/convex/_generated/api";
import { formatCurrency } from "@/utils/format-currency";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AccountLimits() {
  const router = useRouter();

  const limits = useQuery(api.limits.getUserLimits);

  // const handleIncreaseLimit = (limitType: string) => {
  //   Alert.alert(
  //     "Increase Limit",
  //     `To increase your ${limitType} limit, please contact our support team or complete additional verification.`,
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Contact Support",
  //         onPress: () => console.log("Contact support"),
  //       },
  //     ]
  //   );
  // };

  // const handleVerifyAccount = () => {
  //   Alert.alert(
  //     "Account Verification",
  //     "Complete identity verification to increase your account limits.",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Start Verification",
  //         onPress: () => console.log("Start verification"),
  //       },
  //     ]
  //   );
  // };

  const renderProgressBar = (current: number, max: number) => {
    const percentage = Math.min((current / max) * 100, 100); // Cap at 100%
    const exceeded = current > max;

    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${percentage}%`,
                backgroundColor: exceeded
                  ? "#dc2626" // Red if exceeded
                  : percentage >= 90
                    ? "#ef4444" // Red if close to limit
                    : percentage >= 70
                      ? "#f59e0b" // Yellow if warning
                      : "#10b981", // Green if safe
              },
            ]}
          />
          {exceeded && (
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${((current - max) / max) * 100}%`,
                  backgroundColor: "#b91c1c",
                  opacity: 0.5,
                  position: "absolute",
                  left: `${100}%`,
                },
              ]}
            />
          )}
        </View>
        <Text
          style={[
            styles.progressText,
            { color: exceeded ? "#dc2626" : "#64748b" },
          ]}
        >
          {percentage.toFixed(0)}%{exceeded && " (exceeded)"}
        </Text>
      </View>
    );
  };

  if (!limits) {
    return (
      <View style={styles.container}>
        <Text>Loading limits...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Limits</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Status */}
        {/* <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.statusText}>Verified Account</Text>
            </View>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleVerifyAccount}
            >
              <Text style={styles.upgradeButtonText}>Upgrade Limits</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.statusDescription}>
            Your account is verified. Complete additional verification to
            increase your limits.
          </Text>
        </View> */}

        {/* Current Limits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT LIMITS</Text>

          {/* Daily Transaction Limit */}
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <View style={styles.limitIcon}>
                <Ionicons name="calendar-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.limitInfo}>
                <Text style={styles.limitTitle}>Daily Transaction Limit</Text>
                <Text style={styles.limitAmount}>
                  {formatCurrency(limits.daily.used)} /{" "}
                  {formatCurrency(limits.daily.limit)}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.increaseButton}
                onPress={() => handleIncreaseLimit("daily transaction")}
              >
                <Ionicons
                  name="arrow-up-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </TouchableOpacity> */}
            </View>
            {renderProgressBar(limits.daily.used, limits.daily.limit)}
            <Text style={styles.limitNote}>
              Resets at {new Date(limits.daily.resetsAt).toLocaleTimeString()}
            </Text>
          </View>

          {/* Monthly Transaction Limit */}
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <View style={styles.limitIcon}>
                <Ionicons
                  name="calendar-number-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.limitInfo}>
                <Text style={styles.limitTitle}>Monthly Transaction Limit</Text>
                <Text style={styles.limitAmount}>
                  {formatCurrency(limits.monthly.used)} /{" "}
                  {formatCurrency(limits.monthly.limit)}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.increaseButton}
                onPress={() => handleIncreaseLimit("monthly transaction")}
              >
                <Ionicons
                  name="arrow-up-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </TouchableOpacity> */}
            </View>
            {renderProgressBar(limits.monthly.used, limits.monthly.limit)}
            <Text style={styles.limitNote}>
              Resets on {new Date(limits.monthly.resetsAt).toLocaleDateString()}
            </Text>
          </View>

          {/* Single Transaction Limit */}
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <View style={styles.limitIcon}>
                <Ionicons name="card-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.limitInfo}>
                <Text style={styles.limitTitle}>Single Transaction Limit</Text>
                <Text style={styles.limitAmount}>
                  {formatCurrency(limits.singleTx)}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.increaseButton}
                onPress={() => handleIncreaseLimit("single transaction")}
              >
                <Ionicons
                  name="arrow-up-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </TouchableOpacity> */}
            </View>
            {renderProgressBar(0, limits.singleTx)}
            <Text style={styles.limitNote}>Maximum amount per transaction</Text>
          </View>

          {/* Account Balance Limit */}
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <View style={styles.limitIcon}>
                <Ionicons name="wallet-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.limitInfo}>
                <Text style={styles.limitTitle}>Account Balance Limit</Text>
                <Text style={styles.limitAmount}>
                  {formatCurrency(limits.balance.current)} /{" "}
                  {formatCurrency(limits.balance.limit)}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.increaseButton}
                onPress={() => handleIncreaseLimit("account balance")}
              >
                <Ionicons
                  name="arrow-up-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </TouchableOpacity> */}
            </View>
            {renderProgressBar(limits.balance.current, limits.balance.limit)}
            <Text style={styles.limitNote}>
              {limits.balance.current >= limits.balance.limit * 0.9
                ? "You're approaching your balance limit"
                : "Maximum balance you can hold"}
            </Text>
          </View>
        </View>

        {/* How to Increase Limits */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW TO INCREASE LIMITS</Text>

          <View style={styles.howToCard}>
            <View style={styles.howToItem}>
              <View style={styles.howToIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>
                  Complete Identity Verification
                </Text>
                <Text style={styles.howToDescription}>
                  Provide additional documentation to verify your identity
                </Text>
              </View>
            </View>

            <View style={styles.howToItem}>
              <View style={styles.howToIcon}>
                <Ionicons name="time-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>Account History</Text>
                <Text style={styles.howToDescription}>
                  Maintain good account standing for 30+ days
                </Text>
              </View>
            </View>

            <View style={styles.howToItem}>
              <View style={styles.howToIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>Enhanced Security</Text>
                <Text style={styles.howToDescription}>
                  Enable two-factor authentication and security features
                </Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Limit Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIMIT TYPES EXPLAINED</Text>

          <View style={styles.explanationCard}>
            <View style={styles.explanationItem}>
              <Text style={styles.explanationTitle}>Daily Limits</Text>
              <Text style={styles.explanationText}>
                Maximum amount you can transact in a 24-hour period
              </Text>
            </View>

            <View style={styles.explanationItem}>
              <Text style={styles.explanationTitle}>Monthly Limits</Text>
              <Text style={styles.explanationText}>
                Total transaction volume allowed per calendar month
              </Text>
            </View>

            <View style={styles.explanationItem}>
              <Text style={styles.explanationTitle}>Transaction Limits</Text>
              <Text style={styles.explanationText}>
                Maximum amount allowed for a single transaction
              </Text>
            </View>

            <View style={styles.explanationItem}>
              <Text style={styles.explanationTitle}>Balance Limits</Text>
              <Text style={styles.explanationText}>
                Maximum amount you can store in your account
              </Text>
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
  statusCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
    marginLeft: 8,
  },
  upgradeButton: {
    backgroundColor: "#1e3a8a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  statusDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
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
  limitCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  limitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  limitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  limitInfo: {
    flex: 1,
  },
  limitTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  limitAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  increaseButton: {
    padding: 4,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    marginRight: 12,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
    minWidth: 32,
  },
  limitNote: {
    fontSize: 12,
    color: "#94a3b8",
    fontStyle: "italic",
  },
  howToCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  howToItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  howToIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  howToContent: {
    flex: 1,
  },
  howToTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 4,
  },
  howToDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  explanationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  explanationItem: {
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
});
