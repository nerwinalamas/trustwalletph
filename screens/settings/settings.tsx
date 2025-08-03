import Avatar from "@/components/avatar";
import Header from "@/components/header";
import Icon from "@/components/icon";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuItem {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  action: () => void;
}

export default function SettingsScreen() {
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

  const menuItems: MenuItem[] = [
    {
      title: "Privacy",
      subtitle: "Control your data and privacy",
      icon: "lock-closed-outline",
      action: () => router.push("/(settings)/privacy"),
    },
    {
      title: "Account Limits",
      subtitle: "View and increase your limits",
      icon: "wallet-outline",
      action: () => router.push("/(settings)/account-limits"),
    },
    {
      title: "Help Center",
      subtitle: "Get help with your account",
      icon: "help-circle-outline",
      action: () => router.push("/(settings)/help-center"),
    },
    {
      title: "About",
      subtitle: `App version ${appVersion}`,
      icon: "information-circle-outline",
      action: () => router.push("/(settings)/about"),
    },
  ];

  const SettingsMenuItem = ({ item }: { item: MenuItem }) => {
    return (
      <TouchableOpacity style={styles.menuItem} onPress={item.action}>
        <View style={styles.menuLeft}>
          <Icon name={item.icon} size={20} color="#1e3a8a" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => (
    <>
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

      {/* Account Section Title */}
      <Text style={styles.sectionTitle}>ACCOUNT</Text>
    </>
  );

  const ListFooterComponent = () => (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={20} color="#ef4444" />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        style={styles.content}
        data={menuItems}
        renderItem={SettingsMenuItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
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
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
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
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    marginTop: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    marginLeft: 8,
  },
});
