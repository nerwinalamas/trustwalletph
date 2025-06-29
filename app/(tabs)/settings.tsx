import Avatar from "@/components/avatar";
import Header from "@/components/header";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const appVersion = Application.nativeApplicationVersion || "1.0.0";

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.log("OAuth error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Avatar size={80} />
          </View>
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profileEmail}>
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(settings)/privacy")}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Privacy</Text>
                <Text style={styles.menuSubtitle}>
                  Control your data and privacy
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(settings)/account-limits")}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="wallet-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Account Limits</Text>
                <Text style={styles.menuSubtitle}>
                  View and increase your limits
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(settings)/language")}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="language-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Language</Text>
                <Text style={styles.menuSubtitle}>English (US)</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(settings)/help-center")}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Help Center</Text>
                <Text style={styles.menuSubtitle}>
                  Get help with your account
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(settings)/about")}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>About</Text>
                <Text style={styles.menuSubtitle}>
                  App version {appVersion}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#64748b",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    backgroundColor: "#e0e7ff",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    marginLeft: 8,
  },
});
