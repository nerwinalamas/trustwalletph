import BalanceCard from "@/components/balance-card";
import Header from "@/components/header";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { usePrivacyStore } from "@/stores/privacy-store";
import { Transaction } from "@/types/transaction";
import { formatTransactionDate } from "@/utils/format-transaction-date";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  isSpecial?: boolean;
}

export default function HomeScreen() {
  const transactions = useQuery(api.transactions.getUserTransactions);
  const router = useRouter();
  const { settings } = usePrivacyStore();

  const quickActions: QuickAction[] = [
    {
      id: "send",
      title: "Send",
      icon: "arrow-up-outline",
      route: "/(quick-actions)/send",
    },
    {
      id: "receive",
      title: "Receive",
      icon: "arrow-down-outline",
      route: "/(quick-actions)/receive",
    },
    {
      id: "scan",
      title: "Scan",
      icon: "qr-code-outline",
      route: "/(quick-actions)/scan",
      isSpecial: true,
    },
    {
      id: "pay",
      title: "Pay",
      icon: "card-outline",
      route: "/(quick-actions)/pay",
    },
  ];

  const recentTransactions =
    transactions
      ?.sort((a, b) => b._creationTime - a._creationTime)
      .slice(0, 4) || [];

  const renderQuickAction = ({ item }: { item: QuickAction }) => (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => router.push(item.route as any)}
    >
      <View style={[styles.actionIcon, item.isSpecial && styles.scanIcon]}>
        <Ionicons name={item.icon} size={20} color={COLORS.primary.dark} />
      </View>
      <Text style={styles.actionText}>{item.title}</Text>
    </TouchableOpacity>
  );

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
              color={
                isExpense
                  ? COLORS.transaction.expense.rose
                  : COLORS.transaction.income.color
              }
            />
          </View>
          <View style={styles.transactionDetails}>
            <Text
              style={styles.transactionTitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={styles.transactionDate}>
              {formatTransactionDate(transactionDate)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          {settings.hideTransactionAmounts ? (
            <Text style={styles.hiddenAmountText}>₱***</Text>
          ) : (
            <Text
              style={isExpense ? styles.expenseAmount : styles.incomeAmount}
            >
              {isExpense ? "-" : "+"}₱
              {item.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const ListHeaderComponent = () => (
    <>
      {/* Balance Card */}
      <BalanceCard />

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <FlatList
          data={quickActions}
          renderItem={renderQuickAction}
          keyExtractor={(item) => item.id}
          horizontal={false}
          numColumns={4}
          scrollEnabled={false}
          columnWrapperStyle={styles.quickActionsRow}
        />
      </View>

      {/* Transactions Header */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/history")}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={48} color={COLORS.text.muted} />
      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Your recent transactions will appear here
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <ActivityIndicator size="large" color={COLORS.primary.dark} />
    </View>
  );

  if (!transactions) {
    return (
      <View style={styles.container}>
        <Header />
        <ListHeaderComponent />
        {renderLoadingState()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        style={styles.content}
        data={recentTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  quickActionsRow: {
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary.light,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  scanIcon: {
    backgroundColor: COLORS.primary.lighter,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: "500",
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
    color: COLORS.text.primary,
  },
  seeAllText: {
    color: COLORS.primary.main,
    fontWeight: "500",
  },
  loadingState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
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
    color: COLORS.text.secondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.text.light,
    textAlign: "center",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.main,
  },
  transactionLeft: {
    width: "75%",
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
    backgroundColor: COLORS.transaction.expense.background,
  },
  incomeIcon: {
    backgroundColor: COLORS.transaction.income.background,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  transactionDate: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  hiddenAmountText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.tertiary,
    marginRight: 8,
    letterSpacing: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.transaction.expense.color,
    marginRight: 8,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.transaction.income.color,
    marginRight: 8,
  },
});
