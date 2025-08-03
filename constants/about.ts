import {
    AppConfigProps,
    AppInfoItemProps,
    ContactItemProps,
    LegalItemProps,
} from "@/types/about";
import * as Application from "expo-application";
import { Platform } from "react-native";

export const APP_CONFIG: AppConfigProps = {
  name: Application.applicationName || "TrustWalletPH",
  version: Application.nativeApplicationVersion || "1.0.0",
  build: Application.nativeBuildVersion || "2024.01.15",
  platform: Platform.OS === "ios" ? "iOS" : "Android",
  lastUpdated: "January 15, 2024",
  description:
    "A modern and secure mobile application designed to provide you with the best user experience.",
  copyright: "© 2025 TrustWalletPH. All rights reserved.",
};

export const APP_INFO_ITEMS: AppInfoItemProps[] = [
  { label: "Version", value: APP_CONFIG.version },
  { label: "Build", value: APP_CONFIG.build },
  { label: "Platform", value: APP_CONFIG.platform },
  { label: "Last Updated", value: APP_CONFIG.lastUpdated },
];

export const LEGAL_ITEMS: LegalItemProps[] = [
  {
    title: "Terms of Service",
    subtitle: "Read our terms and conditions",
    icon: "document-text-outline",
  },
  {
    title: "Privacy Policy",
    subtitle: "How we handle your data",
    icon: "shield-outline",
  },
  {
    title: "Open Source Licenses",
    subtitle: "Third-party licenses",
    icon: "library-outline",
  },
];

export const CONTACT_ITEMS: ContactItemProps[] = [
  {
    title: "Contact Support",
    subtitle: "support@trustwalletph.com",
    icon: "mail-outline",
  },
  {
    title: "Website",
    subtitle: "Visit our website",
    icon: "globe-outline",
  },
];
