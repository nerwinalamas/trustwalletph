import { COLORS } from "@/constants/colors";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "./avatar";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.main}
      />
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>TrustWalletPH</Text>
        </View>
        <View style={styles.headerRight}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary.dark} />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Avatar size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background.main,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.main,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
    color: COLORS.primary.dark,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 16,
  },
});
