import RecipientCard from "@/components/recipient-card";
import StepHeader from "@/components/step-header";
import { SendMoneyFormData } from "@/utils/schema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
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

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>₱</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.amountInput}
              value={value === 0 ? "" : String(value)}
              onChangeText={(text) => {
                onChange(text);
                trigger("amount");
              }}
              onBlur={onBlur}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
            />
          )}
        />
      </View>

      {/* {errors.amount && (
              <Text style={[styles.errorText, styles.amountError]}>
                {errors.amount.message}
              </Text>
            )} */}

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
          <>
            <Text style={styles.noteLabel}>Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="What's this for?"
              placeholderTextColor="#9ca3af"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          </>
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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0f172a",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    minWidth: 150,
  },
  balanceText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 8,
  },
  noteInput: {
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
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  amountError: {
    textAlign: "center",
  },
  negativeBalance: {
    color: "#ef4444",
  },
});
