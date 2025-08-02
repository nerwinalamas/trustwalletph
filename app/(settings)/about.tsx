import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const APP_CONFIG = {
  name: Application.applicationName || "TrustWalletPH",
  version: Application.nativeApplicationVersion || "1.0.0",
  build: Application.nativeBuildVersion || "2024.01.15",
  platform: Platform.OS === "ios" ? "iOS" : "Android",
  lastUpdated: "January 15, 2024",
  description:
    "A modern and secure mobile application designed to provide you with the best user experience.",
  copyright: "© 2025 TrustWalletPH. All rights reserved.",
};

const APP_INFO_ITEMS = [
  { label: "Version", value: APP_CONFIG.version },
  { label: "Build", value: APP_CONFIG.build },
  { label: "Platform", value: APP_CONFIG.platform },
  { label: "Last Updated", value: APP_CONFIG.lastUpdated },
];

const LEGAL_ITEMS = [
  {
    title: "Terms of Service",
    subtitle: "Read our terms and conditions",
    icon: "document-text-outline" as keyof typeof Ionicons.glyphMap,
    onPress: () => {
      console.log("Navigate to Terms of Service");
    },
  },
  {
    title: "Privacy Policy",
    subtitle: "How we handle your data",
    icon: "shield-outline" as keyof typeof Ionicons.glyphMap,
    onPress: () => {
      console.log("Navigate to Privacy Policy");
    },
  },
  {
    title: "Open Source Licenses",
    subtitle: "Third-party licenses",
    icon: "library-outline" as keyof typeof Ionicons.glyphMap,
    onPress: () => {
      console.log("Navigate to Open Source Licenses");
    },
  },
];

const CONTACT_ITEMS = [
  {
    title: "Contact Support",
    subtitle: "support@trustwalletph.com",
    icon: "mail-outline" as keyof typeof Ionicons.glyphMap,
    onPress: () => {
      Linking.openURL("mailto:support@trustwalletph.com");
    },
  },
  {
    title: "Website",
    subtitle: "Visit our website",
    icon: "globe-outline" as keyof typeof Ionicons.glyphMap,
    onPress: () => {
      Linking.openURL("https://trustwalletph.com");
    },
  },
];

interface MenuItemProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderMenuItem = ({
    title,
    subtitle,
    icon,
    onPress,
  }: MenuItemProps) => (
    <TouchableOpacity key={title} style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIcon}>
          <Ionicons name={icon} size={20} color="#1e3a8a" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#64748b" />
      </View>
    </TouchableOpacity>
  );

  const renderInfoRow = (
    item: { label: string; value: string },
    index: number
  ) => (
    <View
      key={item.label}
      style={[styles.infoRow, index > 0 && styles.infoRowBorder]}
    >
      <Text style={styles.infoLabel}>{item.label}</Text>
      <Text style={styles.infoValue}>{item.value}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title="About" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info Section */}
        <View style={styles.section}>
          <View style={styles.appInfoContainer}>
            <View style={styles.appIconContainer}>
              <Ionicons
                name="phone-portrait-outline"
                size={40}
                color="#1e3a8a"
              />
            </View>
            <Text style={styles.appName}>{APP_CONFIG.name}</Text>
            <Text style={styles.appVersion}>Version {APP_CONFIG.version}</Text>
            <Text style={styles.appDescription}>{APP_CONFIG.description}</Text>
          </View>
        </View>

        {/* App Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoCard}>
            {APP_INFO_ITEMS.map(renderInfoRow)}
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          {LEGAL_ITEMS.map(renderMenuItem)}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          {CONTACT_ITEMS.map(renderMenuItem)}
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>{APP_CONFIG.copyright}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  appInfoContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 8,
  },
  appIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  infoRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#64748b",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
  copyrightSection: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  copyrightText: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
});
