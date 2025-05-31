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

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
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

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setIsScanning(false);
    Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`, [
      {
        text: "OK",
        onPress: () => {
          setScanned(false);
          setIsScanning(true);
          router.back();
        },
      },
    ]);
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    if (!scanned) {
      setScanned(!isScanning);
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
            <TouchableOpacity
              style={styles.scanButton}
              onPress={toggleScanning}
            >
              <Ionicons
                name={isScanning ? "pause" : "play"}
                size={24}
                color="white"
              />
              <Text style={styles.scanButtonText}>
                {isScanning ? "Pause Scanning" : "Resume Scanning"}
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  permissionText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#4f46e5",
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
    borderColor: "#4f46e5",
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
    backgroundColor: "#4f46e5",
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
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(79, 70, 229, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 10,
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
