import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function History() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Transaction History</Text>

        {/* Today's Transactions */}
        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>Today</Text>
          <View style={styles.dateDivider} />

          <TouchableOpacity style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, styles.expenseIcon]}>
                <Ionicons name="arrow-up-outline" size={16} color="#f43f5e" />
              </View>
              <View>
                <Text style={styles.transactionTitle}>Grocery Store</Text>
                <Text style={styles.transactionDate}>10:45 AM</Text>
              </View>
            </View>
            <Text style={styles.expenseAmount}>-₱1,250.00</Text>
          </TouchableOpacity>
        </View>

        {/* Yesterday's Transactions */}
        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>Yesterday</Text>
          <View style={styles.dateDivider} />

          <TouchableOpacity style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, styles.incomeIcon]}>
                <Ionicons name="arrow-down-outline" size={16} color="#22c55e" />
              </View>
              <View>
                <Text style={styles.transactionTitle}>Salary Deposit</Text>
                <Text style={styles.transactionDate}>9:30 AM</Text>
              </View>
            </View>
            <Text style={styles.incomeAmount}>+₱15,000.00</Text>
          </TouchableOpacity>
        </View>

        {/* May 2, 2023 Transactions */}
        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>May 2, 2023</Text>
          <View style={styles.dateDivider} />

          <TouchableOpacity style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, styles.expenseIcon]}>
                <Ionicons name="arrow-up-outline" size={16} color="#f43f5e" />
              </View>
              <View>
                <Text style={styles.transactionTitle}>Electric Bill</Text>
                <Text style={styles.transactionDate}>2:15 PM</Text>
              </View>
            </View>
            <Text style={styles.expenseAmount}>-₱2,450.75</Text>
          </TouchableOpacity>
        </View>

        {/* April 30, 2023 Transactions */}
        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>April 30, 2023</Text>
          <View style={styles.dateDivider} />

          <TouchableOpacity style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, styles.expenseIcon]}>
                <Ionicons name="arrow-up-outline" size={16} color="#f43f5e" />
              </View>
              <View>
                <Text style={styles.transactionTitle}>Shopping Mall</Text>
                <Text style={styles.transactionDate}>4:20 PM</Text>
              </View>
            </View>
            <Text style={styles.expenseAmount}>-₱2,350.50</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, styles.expenseIcon]}>
                <Ionicons name="arrow-up-outline" size={16} color="#f43f5e" />
              </View>
              <View>
                <Text style={styles.transactionTitle}>Restaurant</Text>
                <Text style={styles.transactionDate}>1:30 PM</Text>
              </View>
            </View>
            <Text style={styles.expenseAmount}>-₱850.00</Text>
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
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
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
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
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
