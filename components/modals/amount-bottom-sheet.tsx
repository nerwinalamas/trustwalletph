import Button from "@/components/button";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

interface AmountBottomSheetProps {
  visible: boolean;
  amount: string;
  setAmount: (amount: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AmountBottomsheet({
  visible,
  amount,
  setAmount,
  onConfirm,
  onCancel,
}: AmountBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.bottomSheetOverlay}>
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetTitle}>Enter Amount</Text>

          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₱</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              autoFocus={true}
            />
          </View>

          <View style={styles.bottomSheetButtons}>
            <Button
              title="Cancel"
              onPress={onCancel}
              variant="secondary"
              flex={true}
            />
            <Button
              title="Confirm"
              onPress={onConfirm}
              variant="primary"
              flex={true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 32,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 24,
    textAlign: "center",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
  },
  bottomSheetButtons: {
    flexDirection: "row",
    gap: 12,
  },
});
