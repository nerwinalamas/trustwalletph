import Alerts from "@/components/alerts";
import StepHeader from "@/components/step-header";
import { StyleSheet, Text, View } from "react-native";
import { Recipient } from "./send";

interface StepThreeProps {
  selectedRecipient: Recipient | null;
  amount: number;
  note: string | undefined;
  currency?: string;
}

export default function StepThree({
  selectedRecipient,
  amount,
  note,
  currency = "₱",
}: StepThreeProps) {
  if (!selectedRecipient) return null;

  const confirmationData = [
    { label: "Recipient", value: selectedRecipient.name },
    { label: "Email", value: selectedRecipient.email },
    { label: "Account", value: "****1234" },
    { label: "Amount", value: `${currency}${amount}` },
    { label: "Note", value: note || "None" },
  ];

  return (
    <>
      <StepHeader
        title="Confirm Details"
        description="Please review transaction details"
      />

      <View style={styles.confirmationCard}>
        {confirmationData.map((item, index) => (
          <View key={index} style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>{item.label}</Text>
            <Text style={styles.confirmationValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Alerts description="By proceeding, you confirm that all details are correct and you authorize this transaction." />
    </>
  );
}

const styles = StyleSheet.create({
  confirmationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  confirmationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
  },
  confirmationLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  confirmationValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    textAlign: "right",
  },
});
