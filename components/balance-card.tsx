import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BalanceCard() {
  const walletData = useQuery(api.users.getUserWallet);
  const [showBalance, setShowBalance] = useState(true);

  // Format balance with commas
  const formattedBalance = walletData?.balance
    ? walletData.balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  // Mask account number
  const maskedAccount = walletData?.accountNumber
    ? `•••• ${walletData.accountNumber.slice(-4)}`
    : "•••• ••••";

  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          <Ionicons
            name={showBalance ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.balanceAmount}>
        ₱ {showBalance ? formattedBalance : "••••"}
      </Text>

      <View style={styles.accountRow}>
        <Text style={styles.accountNumber}>Account: {maskedAccount}</Text>
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
