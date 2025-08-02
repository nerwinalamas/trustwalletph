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

interface ExplanationItem {
  title: string;
  description: string;
}

interface LimitCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  current: number;
  limit: number;
  note: string;
  showProgress?: boolean;
}

const EXPLANATIONS: ExplanationItem[] = [
  {
    title: "Daily Limits",
    description:
      "Maximum amount you can transact in a 24-hour period. Resets every midnight.",
  },
  {
    title: "Monthly Limits",
    description:
      "Total transaction volume allowed per calendar month. Helps manage spending patterns.",
  },
  {
    title: "Transaction Limits",
    description:
      "Maximum amount allowed for a single transaction. Provides security against large unauthorized transfers.",
  },
  {
    title: "Balance Limits",
    description:
      "Maximum amount you can store in your account. Upgrade your account for higher limits.",
  },
];

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

  const renderLimitCard = ({
    icon,
    title,
    current,
    limit,
    note,
    showProgress = true,
  }: LimitCardProps) => (
    <View style={styles.limitCard}>
      <View style={styles.limitHeader}>
        <View style={styles.limitIcon}>
          <Ionicons name={icon} size={20} color="#1e3a8a" />
        </View>
        <View style={styles.limitInfo}>
          <Text style={styles.limitTitle}>{title}</Text>
          <Text style={styles.limitAmount}>
            {limit > 0
              ? `${formatCurrency(current)} / ${formatCurrency(limit)}`
              : formatCurrency(current)}
          </Text>
        </View>
      </View>
      {showProgress && renderProgressBar(current, limit)}
      <Text style={styles.limitNote}>{note}</Text>
    </View>
  );

  const renderExplanationItem = (item: ExplanationItem) => (
    <View key={item.title} style={styles.explanationItem}>
      <Text style={styles.explanationTitle}>{item.title}</Text>
      <Text style={styles.explanationText}>{item.description}</Text>
    </View>
  );

  if (!limits) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const limitCards: LimitCardProps[] = [
    {
      icon: "calendar-outline",
      title: "Daily Transaction Limit",
      current: limits.daily.used,
      limit: limits.daily.limit,
      note: `Resets at ${new Date(limits.daily.resetsAt).toLocaleTimeString()}`,
    },
    {
      icon: "calendar-number-outline",
      title: "Monthly Transaction Limit",
      current: limits.monthly.used,
      limit: limits.monthly.limit,
      note: `Resets on ${new Date(limits.monthly.resetsAt).toLocaleDateString()}`,
    },
    {
      icon: "card-outline",
      title: "Single Transaction Limit",
      current: 0,
      limit: limits.singleTx,
      note: "Maximum amount per transaction",
    },
    {
      icon: "wallet-outline",
      title: "Account Balance Limit",
      current: limits.balance.current,
      limit: limits.balance.limit,
      note:
        limits.balance.current >= limits.balance.limit * 0.9
          ? "You're approaching your balance limit"
          : "Maximum balance you can hold",
    },
  ];

  return (
    <View style={styles.container}>
      <BackHeader title="Account Limits" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT LIMITS</Text>

          {limitCards.map((cardProps, index) => (
            <View key={index}>{renderLimitCard(cardProps)}</View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIMIT TYPES EXPLAINED</Text>

          <View style={styles.explanationCard}>
            {EXPLANATIONS.map(renderExplanationItem)}
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
