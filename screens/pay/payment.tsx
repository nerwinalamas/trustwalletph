import Alerts from "@/components/alerts";
import BackHeader from "@/components/back-header";
import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
import { companyDetails } from "@/constants/pay";
import { api } from "@/convex/_generated/api";
import { SERVICE_FEE } from "@/convex/payments";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const paymentSchema = z.object({
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .min(6, "Account number must be at least 6 characters"),
  amount: z.string().min(1, "Amount is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentScreen() {
  const router = useRouter();
  const { companyId } = useLocalSearchParams();

  const payBill = useMutation(api.payments.payBill);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      accountNumber: "",
      amount: "",
    },
  });

  const companyIdStr = Array.isArray(companyId)
    ? companyId[0]
    : companyId || "";
  const company = companyDetails[companyIdStr] || {
    name: "Unknown Company",
    type: "Unknown",
    icon: "business",
    color: COLORS.text.tertiary,
  };

  const amountValue = Number(watch("amount")) || 0;
  const totalAmount = amountValue + SERVICE_FEE;

  const onSubmit = async (data: PaymentFormData) => {
    if (!companyIdStr) return;

    try {
      await payBill({
        companyId: companyIdStr,
        companyName: company.name,
        accountNumber: data.accountNumber,
        amount: Number(data.amount),
      });

      router.replace("/(tabs)");
    } catch (error) {
      console.log("Transaction failed. Please try again:", error);
    }
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
            <Controller
              control={control}
              name="accountNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Account/Reference Number"
                  placeholder="Enter account or reference number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.accountNumber?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Amount"
                  variant="amount"
                  prefix="₱"
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.amount?.message}
                  required
                />
              )}
            />
          </View>

          <View style={styles.summaryContainer}>
            {[
              { label: "Amount", value: `₱${amountValue.toFixed(2)}` },
              { label: "Service Fee", value: `₱${SERVICE_FEE.toFixed(2)}` },
              { label: "Total", value: `₱${totalAmount.toFixed(2)}` },
            ].map((item, index, array) => {
              const isLastItem = index === array.length - 1;
              return (
                <View
                  key={index}
                  style={[styles.summaryRow, isLastItem && styles.totalRow]}
                >
                  <Text
                    style={isLastItem ? styles.totalLabel : styles.summaryLabel}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={isLastItem ? styles.totalValue : styles.summaryValue}
                  >
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>

          <Alerts description="Payment processing may take up to 24 hours. You will receive a notification once the payment is complete." />

          <Button
            title="Pay Now"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
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
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: COLORS.shadow.light,
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
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  companyHeaderSubtitle: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  formContainer: {
    gap: 20,
    marginBottom: 24,
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: COLORS.shadow.light,
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
    color: COLORS.text.tertiary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border.main,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
});
