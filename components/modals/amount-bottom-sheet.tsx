import Button from "@/components/button";
import Input from "@/components/input";
import { Modal, StyleSheet, Text, View } from "react-native";

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

          <Input
            variant="amount"
            prefix="₱"
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            autoFocus={true}
          />

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
  bottomSheetButtons: {
    flexDirection: "row",
    gap: 12,
  },
});
