import Header from "@/components/header";
import { api } from "@/convex/_generated/api";
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
import { Transaction } from ".";

export default function History() {
  const transactions = useQuery(api.transactions.getUserTransactions);

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
              color={isReceive ? "#22c55e" : "#f43f5e"}
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
        <Text style={isReceive ? styles.incomeAmount : styles.expenseAmount}>
          {isReceive ? "+" : "-"}₱{item.amount.toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.dateSection}>
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
            <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
            <Text style={styles.emptyStateTitle}>No transactions yet</Text>
            <Text style={styles.emptyStateText}>
              Your transaction history will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
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
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  dateSection: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  dateDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
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
    backgroundColor: "#fee2e2",
  },
  incomeIcon: {
    backgroundColor: "#dcfce7",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  transactionDate: {
    fontSize: 14,
    color: "#64748b",
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ef4444",
    marginRight: 6,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#22c55e",
    marginRight: 6,
  },
});
