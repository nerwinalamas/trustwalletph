import Header from "@/components/header";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { usePrivacyStore } from "@/stores/privacy-store";
import { Transaction } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { format, isToday, isYesterday } from "date-fns";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HistoryScreen() {
  const transactions = useQuery(api.transactions.getUserTransactions);
  const { settings } = usePrivacyStore();

  // Transform data into sections
  const getSections = () => {
    if (!transactions) return [];
    if (transactions.length === 0) return [];

    const grouped: { [key: string]: any[] } = {};

    // Group by date
    transactions.forEach((tx) => {
      const date = new Date(tx._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(tx);
    });

    // Convert to SectionList format
    return Object.keys(grouped)
      .map((date) => {
        const sectionDate = new Date(date);
        let title;

        if (isToday(sectionDate)) {
          title = "Today";
        } else if (isYesterday(sectionDate)) {
          title = "Yesterday";
        } else {
          title = format(sectionDate, "MMMM d, yyyy");
        }

        return {
          title,
          data: grouped[date],
        };
      })
      .sort(
        (a, b) =>
          new Date(b.data[0]._creationTime).getTime() -
          new Date(a.data[0]._creationTime).getTime()
      ); // Newest first
  };

  const renderItem = ({ item }: { item: Transaction }) => {
    const isReceive = item.transactionType === "receive";

    return (
      <TouchableOpacity style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View
            style={[
              styles.transactionIcon,
              isReceive ? styles.incomeIcon : styles.expenseIcon,
            ]}
          >
            <Ionicons
              name={isReceive ? "arrow-down-outline" : "arrow-up-outline"}
              size={16}
              color={
                isReceive
                  ? COLORS.transaction.income.color
                  : COLORS.transaction.expense.rose
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
              {format(new Date(item._creationTime), "h:mm a")}
            </Text>
          </View>
        </View>

        {settings.hideTransactionAmounts ? (
          <Text style={styles.hiddenAmountText}>₱***</Text>
        ) : (
          <Text style={isReceive ? styles.incomeAmount : styles.expenseAmount}>
            {isReceive ? "+" : "-"}₱{item.amount.toFixed(2)}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View>
      <Text style={styles.dateLabel}>{section.title}</Text>
      <View style={styles.dateDivider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      <SectionList
        sections={getSections()}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.pageTitle}>Transaction History</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={48}
              color={COLORS.text.muted}
            />
            <Text style={styles.emptyStateTitle}>No transactions yet</Text>
            <Text style={styles.emptyStateText}>
              Your transaction history will appear here
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
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
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.text.light,
    textAlign: "center",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.tertiary,
    marginBottom: 8,
  },
  dateDivider: {
    height: 1,
    backgroundColor: COLORS.border.main,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
  },
  transactionLeft: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  transactionDate: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.transaction.expense.color,
    marginRight: 6,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.transaction.income.color,
    marginRight: 6,
  },
  hiddenAmountText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.tertiary,
    marginRight: 8,
    letterSpacing: 1,
  },
});
