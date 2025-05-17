import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BalanceCard() {
  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <TouchableOpacity>
          <Ionicons name="eye-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.balanceAmount}>₱ 24,850.75</Text>

      <View style={styles.accountRow}>
        <Text style={styles.accountNumber}>Account: •••• 4832</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    // Create linear gradient effect
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountNumber: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
});
