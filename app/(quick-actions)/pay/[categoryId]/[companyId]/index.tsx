import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const companyDetails: Record<
  string,
  { name: string; type: string; icon: string; color: string }
> = {
  meralco: {
    name: "Manila Electric Company (MERALCO)",
    type: "Electric",
    icon: "flash",
    color: "#f59e0b",
  },
  davao: {
    name: "Davao Light & Power Co.",
    type: "Electric",
    icon: "flash",
    color: "#f59e0b",
  },
  manila_water: {
    name: "Manila Water Company",
    type: "Water",
    icon: "water",
    color: "#3b82f6",
  },
  maynilad: {
    name: "Maynilad Water Services",
    type: "Water",
    icon: "water",
    color: "#3b82f6",
  },
  pldt: { name: "PLDT", type: "Internet", icon: "wifi", color: "#10b981" },
  globe: {
    name: "Globe Telecom",
    type: "Internet",
    icon: "wifi",
    color: "#10b981",
  },
  up: {
    name: "University of the Philippines",
    type: "School",
    icon: "school",
    color: "#8b5cf6",
  },
  ust: {
    name: "University of Santo Tomas",
    type: "School",
    icon: "school",
    color: "#8b5cf6",
  },
};

export default function Payment() {
  const { companyId } = useLocalSearchParams();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const companyIdStr = Array.isArray(companyId)
    ? companyId[0]
    : companyId || "";
  const company = companyDetails[companyIdStr] || {
    name: "Unknown Company",
    type: "Unknown",
    icon: "business",
    color: "#64748b",
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Payment" />

      <View style={styles.mainContent}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.companyHeader}>
            <View
              style={[
                styles.companyHeaderIcon,
                { backgroundColor: `${company.color}20` },
              ]}
            >
              <Ionicons
                name={company.icon as any}
                size={24}
                color={company.color}
              />
            </View>
            <View style={styles.companyHeaderInfo}>
              <Text style={styles.companyHeaderTitle}>{company.name}</Text>
              <Text style={styles.companyHeaderSubtitle}>{company.type}</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Account/Reference Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter account or reference number"
                placeholderTextColor="#9ca3af"
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>₱</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>₱{amount || "0.00"}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>₱0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₱{amount || "0.00"}</Text>
            </View>
          </View>

          <View style={styles.noticeContainer}>
            <Ionicons name="information-circle" size={20} color="#4f46e5" />
            <Text style={styles.noticeText}>
              Payment processing may take up to 24 hours. You will receive a
              notification once the payment is complete.
            </Text>
          </View>

          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    paddingTop: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  companyHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fef3c7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  companyHeaderInfo: {
    flex: 1,
  },
  companyHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
  },
  companyHeaderSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  formContainer: {
    gap: 20,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  noticeContainer: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
