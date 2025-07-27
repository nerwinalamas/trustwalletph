import Input from "@/components/input";
import RecipientCard from "@/components/recipient-card";
import StepHeader from "@/components/step-header";
import { SendMoneyFormData } from "@/utils/schema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { Recipient } from "./send";

interface StepTwoProps {
  control: Control<SendMoneyFormData>;
  errors: FieldErrors<SendMoneyFormData>;
  selectedRecipient: Recipient | null;
  amount: number;
  availableBalance: number;
  trigger: (name?: keyof SendMoneyFormData) => Promise<boolean>;
}

export default function StepTwo({
  control,
  errors,
  selectedRecipient,
  amount,
  availableBalance,
  trigger,
}: StepTwoProps) {
  if (!selectedRecipient) return null;

  const remainingBalance = availableBalance - amount;

  return (
    <>
      <StepHeader
        title="How much are you sending?"
        description="Enter amount to send"
      />

      <RecipientCard
        recipient={selectedRecipient}
        style={styles.recipientCard}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            variant="amount"
            prefix="₱"
            value={value === 0 ? "" : String(value)}
            onChangeText={(text) => {
              onChange(text);
              trigger("amount");
            }}
            onBlur={onBlur}
            keyboardType="decimal-pad"
            placeholder="0.00"
            containerStyle={{ marginBottom: 12 }}
          />
        )}
      />

      <Text
        style={[
          styles.balanceText,
          amount > 0 && remainingBalance < 0 ? styles.negativeBalance : {},
        ]}
      >
        Available Balance: ₱
        {(amount > 0 ? remainingBalance : availableBalance).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </Text>

      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Note (Optional)"
            placeholder="What's this for?"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
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
  balanceText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  negativeBalance: {
    color: "#ef4444",
  },
});
