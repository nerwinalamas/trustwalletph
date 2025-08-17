import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();
  const scanLinePos = useRef(new Animated.Value(0)).current;

  // Animation effect
  useEffect(() => {
    const animateScanLine = () => {
      scanLinePos.setValue(0);
      Animated.timing(scanLinePos, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (isScanning) animateScanLine();
      });
    };

    if (isScanning) {
      animateScanLine();
    }
  }, [isScanning, scanLinePos]);

  useEffect(() => {
    const getPermission = async () => {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permission required",
          "Camera access is needed to scan QR codes"
        );
      }
    };
    getPermission();
  }, [requestPermission]);

  const parseQRData = (data: string) => {
    try {
      // Try to parse as JSON first (for payment requests)
      const parsed = JSON.parse(data);

      if (parsed.type === "payment-request") {
        return {
          isPaymentRequest: true,
          email: parsed.email,
          accountNumber: parsed.accountNumber,
          name: parsed.name,
          amount: parsed.amount,
          timestamp: parsed.timestamp,
        };
      }
    } catch (error) {
      // If JSON parsing fails, treat as plain text (could be email or other data)
      console.log("QR data is not JSON, treating as plain text:", error);
    }

    // Check if it's an email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data)) {
      return {
        isPaymentRequest: false,
        email: data,
      };
    }

    // Return null for unsupported formats
    return null;
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setIsScanning(false);

    const qrData = parseQRData(data);

    if (!qrData) {
      // Show alert for unsupported QR codes
      Alert.alert(
        "Unsupported QR Code",
        "This QR code format is not supported for payments.",
        [
          {
            text: "OK",
            onPress: () => {
              setIsScanning(true);
            },
          },
          {
            text: "Go Back",
            onPress: () => router.back(),
          },
        ]
      );
      return;
    }

    if (qrData.isPaymentRequest && qrData.amount) {
      // Navigate to send screen step 3 (confirmation) with all data pre-filled
      router.replace({
        pathname: "/send",
        params: {
          email: qrData.email,
          amount: qrData.amount.toString(),
          recipientName: qrData.name,
          step: "3",
          fromQR: "true",
        },
      });
    } else if (qrData.isPaymentRequest || qrData.email) {
      // Navigate to send screen step 2 (amount entry) with email pre-filled
      router.replace({
        pathname: "/send",
        params: {
          email: qrData.email,
          recipientName: qrData.name || "",
          step: "2",
          fromQR: "true",
        },
      });
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const scanLineTranslate = scanLinePos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scanFrameSize - 4], // -4 to account for line height
  });

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "ean13", "ean8", "upc_a", "upc_e"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.scanTitle}>Scan QR Code</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.middleOverlay}>
            <View style={styles.sideOverlay} />
            <View style={styles.focusBox}>
              {/* Top Left Corner */}
              <View style={[styles.corner, styles.topLeftCorner]} />
              {/* Top Right Corner */}
              <View style={[styles.corner, styles.topRightCorner]} />
              {/* Bottom Left Corner */}
              <View style={[styles.corner, styles.bottomLeftCorner]} />
              {/* Bottom Right Corner */}
              <View style={[styles.corner, styles.bottomRightCorner]} />

              {isScanning && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    { transform: [{ translateY: scanLineTranslate }] },
                  ]}
                />
              )}
            </View>
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            <Text style={styles.instructionText}>
              Align QR code within the frame to scan
            </Text>
            <Text style={styles.subInstructionText}>
              Supports payment requests and email addresses
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const scanFrameSize = width * 0.8;
const cornerSize = 40;
const cornerWidth = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background.main,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background.main,
  },
  permissionText: {
    fontSize: 16,
    color: COLORS.text.tertiary,
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: COLORS.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  topOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    padding: 8,
  },
  scanTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  middleOverlay: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sideOverlay: {
    height: scanFrameSize,
    width: (width - scanFrameSize) / 2,
  },
  focusBox: {
    width: scanFrameSize,
    height: scanFrameSize,
    backgroundColor: "transparent",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: cornerSize,
    height: cornerSize,
    borderColor: COLORS.primary.main,
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderTopWidth: cornerWidth,
    borderLeftWidth: cornerWidth,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderTopWidth: cornerWidth,
    borderRightWidth: cornerWidth,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomWidth: cornerWidth,
    borderLeftWidth: cornerWidth,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomWidth: cornerWidth,
    borderRightWidth: cornerWidth,
  },
  scanLine: {
    height: 4,
    width: scanFrameSize,
    backgroundColor: COLORS.primary.main,
    position: "absolute",
  },
  bottomOverlay: {
    alignItems: "center",
    paddingBottom: 40,
  },
  instructionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 40,
  },
  subInstructionText: {
    color: COLORS.whiteOpacity[80],
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
