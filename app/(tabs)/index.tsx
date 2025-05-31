import BalanceCard from "@/components/balance-card";
import Header from "@/components/header";
import { api } from "@/convex/_generated/api";
import { formatTransactionDate } from "@/utils/format-transaction-date";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Transaction {
  _id: string;
  _creationTime: number;
  userId: string;
  transactionType: "receive" | "send" | "bill";
  title: string;
  amount: number;
  description?: string;
  recipientType?: "user" | "bill";
  recipientId?: string;
}

export default function Home() {
  const transactions = useQuery(api.transactions.getUserTransactions);
  const router = useRouter();

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isSend = item.transactionType === "send";
    const isBill = item.transactionType === "bill";
    const isExpense = isSend || isBill;
    const transactionDate = new Date(item._creationTime);

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View
            style={[
              styles.transactionIcon,
              isExpense ? styles.expenseIcon : styles.incomeIcon,
            ]}
          >
            <Ionicons
              name={isExpense ? "arrow-up-outline" : "arrow-down-outline"}
              size={16}
              color={isExpense ? "#f43f5e" : "#22c55e"}
            />
          </View>
          <View>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionDate}>
              {formatTransactionDate(transactionDate)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text style={isExpense ? styles.expenseAmount : styles.incomeAmount}>
            {isExpense ? "-" : "+"}₱
            {item.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <BalanceCard />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(quick-actions)/send")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="arrow-up-outline" size={20} color="#1e3a8a" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(quick-actions)/receive")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="arrow-down-outline" size={20} color="#1e3a8a" />
            </View>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(quick-actions)/scan")}
          >
            <View style={[styles.actionIcon, styles.scanIcon]}>
              <Ionicons name="qr-code-outline" size={20} color="#1e3a8a" />
            </View>
            <Text style={styles.actionText}>Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(quick-actions)/pay")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="card-outline" size={20} color="#1e3a8a" />
            </View>
            <Text style={styles.actionText}>Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.replace("/(tabs)/history")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions?.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyStateTitle}>No transactions yet</Text>
              <Text style={styles.emptyStateText}>
                Your recent transactions will appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={transactions
                ?.sort((a, b) => b._creationTime - a._creationTime)
                .slice(0, 4)}
              renderItem={renderTransactionItem}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
            />
          )}
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
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  scanIcon: {
    backgroundColor: "#dbeafe",
  },
  actionText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
  },
  transactionsContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  seeAllText: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expenseIcon: {
    backgroundColor: "#fee2e2",
  },
  incomeIcon: {
    backgroundColor: "#dcfce7",
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: "#64748b",
  },
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    marginRight: 8,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22c55e",
    marginRight: 8,
  },
});
