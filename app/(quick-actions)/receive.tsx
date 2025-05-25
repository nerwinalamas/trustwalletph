import BackHeader from "@/components/back-header";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
// import * as MediaLibrary from 'expo-media-library';
// import { captureRef } from 'react-native-view-shot';

export default function Receive() {
  const user = useQuery(api.users.getCurrentUser);
  const [amount, setAmount] = useState("");
  const [showAmountSheet, setShowAmountSheet] = useState(false);
  const qrRef = useRef(null);
  // const [hasMediaPermission, setHasMediaPermission] = useState(false);

  // const requestMediaPermission = async () => {
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   setHasMediaPermission(status === 'granted');
  //   return status === 'granted';
  // };

  const downloadQRCode = async () => {
    // try {
    //   if (!hasMediaPermission && !(await requestMediaPermission())) {
    //     Alert.alert("Permission required", "We need permission to save the QR code to your gallery");
    //     return;
    //   }

    //   if (!qrRef.current) return;

    //   const uri = await captureRef(qrRef, {
    //     format: 'png',
    //     quality: 1,
    //   });

    //   const album = await MediaLibrary.getAlbumAsync('TrustWalletPH');
    //   if (album === null) {
    //     await MediaLibrary.createAlbumAsync('TrustWalletPH', uri, false);
    //   } else {
    //     await MediaLibrary.addAssetsToAlbumAsync([uri], album, false);
    //   }

    //   Alert.alert("Success", "QR code saved to your gallery");
    // } catch (error) {
    //   console.error("Error saving QR code:", error);
    //   Alert.alert("Error", "Failed to save QR code");
    // }
    console.log("downloadQRCode")
  };

  const getQRValue = () => {
    return JSON.stringify({
      type: "payment-request",
      email: user?.email,
      accountNumber: user?.accountNumber,
      name: user?.fullName,
      amount: amount ? parseFloat(amount) : undefined,
      timestamp: Date.now()
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Receive" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeWrapper} ref={qrRef}>
            <QRCode
              value={getQRValue()}
              size={200}
              color="#0f172a"
              backgroundColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.accountInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{user?.fullName}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Number</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{user?.accountNumber}</Text>
              </View>
            </View>
            
            {/* Amount Button */}
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={() => setShowAmountSheet(true)}
            >
              <Ionicons 
                name={amount ? "checkmark-circle" : "add-circle"} 
                size={20} 
                color={amount ? "#10b981" : "#4f46e5"} 
              />
              <Text style={styles.amountButtonText}>
                {amount ? `Amount: ₱${parseFloat(amount).toFixed(2)}` : "Add Amount"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Buttons Container */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.downloadButton]}
              onPress={downloadQRCode}
            >
              <Ionicons name="download-outline" size={20} color="#4f46e5" />
              <Text style={[styles.actionButtonText, { color: "#4f46e5" }]}>Download</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
              <Ionicons name="share-social-outline" size={20} color="#ffffff" />
              <Text style={[styles.actionButtonText, { color: "#ffffff" }]}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noteContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#4f46e5"
            />
            <Text style={styles.noteText}>
              You can receive money by sharing your QR code or account number
              with others.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Amount Bottom Sheet */}
      <Modal
        visible={showAmountSheet}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAmountSheet(false)}
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
              <TouchableOpacity 
                style={[styles.bottomSheetButton, styles.cancelButton]}
                onPress={() => {
                  setAmount("");
                  setShowAmountSheet(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.bottomSheetButton, styles.confirmButton]}
                onPress={() => setShowAmountSheet(false)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
  },
  qrContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    borderBottomColor: "#f1f5f9",
  },
  infoLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
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
    borderColor: "#e2e8f0",
    borderRadius: 8,
    marginTop: 16,
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
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
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#4f46e5",
  },
  shareButton: {
    backgroundColor: "#4f46e5",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 16,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
  },
  // Bottom Sheet Styles
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
    paddingVertical: 12,
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
    justifyContent: "space-between",
    gap: 12,
  },
  bottomSheetButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  confirmButton: {
    backgroundColor: "#4f46e5",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});