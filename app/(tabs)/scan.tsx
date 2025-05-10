import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const scanSize = width * 0.65;

export default function Scan() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <View style={styles.scanContainer}>
        {/* Top Section - Title and Flash Button */}
        <View style={styles.scanHeader}>
          <Text style={styles.pageTitle}>Scan QR Code</Text>
          <TouchableOpacity style={styles.flashButton}>
            <Ionicons name="flash-outline" size={24} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Scanner Area */}
        <View style={styles.cameraContainer}>
          <View style={styles.scanFrameContainer}>
            {/* Scanner Frame */}
            <View style={styles.scanFrame}>
              {/* Corner Elements */}
              <View style={[styles.cornerElement, styles.topLeft]} />
              <View style={[styles.cornerElement, styles.topRight]} />
              <View style={[styles.cornerElement, styles.bottomLeft]} />
              <View style={[styles.cornerElement, styles.bottomRight]} />
            </View>

            {/* Scanner Line Animation */}
            <View style={styles.scanLine} />
          </View>

          {/* Scan Instruction */}
          <Text style={styles.scanInstructions}>
            Align QR code within the frame to scan
          </Text>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="image-outline" size={22} color="#4f46e5" />
            </View>
            <Text style={styles.actionText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIconContainer, styles.primaryIcon]}>
              <Ionicons name="scan-outline" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="create-outline" size={22} color="#4f46e5" />
            </View>
            <Text style={styles.actionText}>My QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scanContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    height: scanSize + 50,
  },
  scanFrameContainer: {
    width: scanSize,
    height: scanSize,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scanFrame: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.05)",
    overflow: "hidden",
  },
  cornerElement: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#4f46e5",
    borderWidth: 3,
  },
  topLeft: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    width: "80%",
    height: 2,
    backgroundColor: "#4f46e5",
    top: "50%",
    opacity: 0.7,
  },
  scanInstructions: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    marginBottom: 10,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  primaryIcon: {
    backgroundColor: "#4f46e5",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  actionText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
});
