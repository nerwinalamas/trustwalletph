import BackHeader from "@/components/back-header";
import AmountBottomsheet from "@/components/modals/amount-bottom-sheet";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ReceiveScreen() {
  const user = useQuery(api.users.getCurrentUser);
  const [amount, setAmount] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("");
  const [showAmountSheet, setShowAmountSheet] = useState(false);
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const qrRef = useRef(null);

  const getQRValue = () => {
    return JSON.stringify({
      type: "payment-request",
      email: user?.email,
      accountNumber: user?.accountNumber,
      name: user?.fullName,
      amount: confirmedAmount ? parseFloat(confirmedAmount) : undefined,
      timestamp: qrTimestamp,
    });
  };

  const handleConfirmAmount = () => {
    setConfirmedAmount(amount);
    setQrTimestamp(Date.now());
    setShowAmountSheet(false);
  };

  const handleCancelAmount = () => {
    setAmount(confirmedAmount);
    setShowAmountSheet(false);
  };

  // Mask account number
  const maskedAccount = user?.accountNumber
    ? `•••• ${user.accountNumber.slice(-4)}`
    : "•••• ••••";

  const accountInfo = [
    { label: "Name", value: user?.fullName },
    { label: "Email", value: user?.email },
    { label: "Account Number", value: maskedAccount },
  ];

  return (
    <View style={styles.container}>
      <BackHeader title="Receive" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeWrapper} ref={qrRef}>
            <QRCode
              value={getQRValue()}
              size={200}
              color={COLORS.text.primary}
              backgroundColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.accountInfo}>
            {accountInfo.map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            ))}

            {/* Amount Button */}
            <TouchableOpacity
              style={styles.amountButton}
              onPress={() => {
                setAmount(confirmedAmount);
                setShowAmountSheet(true);
              }}
            >
              <Ionicons
                name={confirmedAmount ? "checkmark-circle" : "add-circle"}
                size={20}
                color={
                  confirmedAmount ? COLORS.primary.green : COLORS.primary.main
                }
              />
              <Text style={styles.amountButtonText}>
                {confirmedAmount
                  ? `Amount: ₱${parseFloat(confirmedAmount).toFixed(2)}`
                  : "Add Amount"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Amount Bottom Sheet */}
      <AmountBottomsheet
        visible={showAmountSheet}
        amount={amount}
        setAmount={setAmount}
        onConfirm={handleConfirmAmount}
        onCancel={handleCancelAmount}
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
    flex: 1,
    backgroundColor: COLORS.white,
  },
  qrContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border.main,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
  },
  accountInfo: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.text.tertiary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border.main,
    borderRadius: 8,
    marginTop: 16,
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  downloadButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary.main,
  },
  shareButton: {
    backgroundColor: COLORS.primary.main,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
