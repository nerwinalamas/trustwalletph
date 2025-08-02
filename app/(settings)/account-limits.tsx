import BackHeader from "@/components/back-header";
import { api } from "@/convex/_generated/api";
import { formatCurrency } from "@/utils/format-currency";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AccountLimits() {
  const limits = useQuery(api.limits.getUserLimits);

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
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Account Limits" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
            </View>
            {renderProgressBar(limits.balance.current, limits.balance.limit)}
            <Text style={styles.limitNote}>
              {limits.balance.current >= limits.balance.limit * 0.9
                ? "You're approaching your balance limit"
                : "Maximum balance you can hold"}
            </Text>
          </View>
        </View>

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
