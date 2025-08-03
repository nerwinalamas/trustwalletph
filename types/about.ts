import { Ionicons } from "@expo/vector-icons";

export interface AppConfigProps {
  name: string;
  version: string;
  build: string;
  platform: string;
  lastUpdated: string;
  description: string;
  copyright: string;
}

export interface AppInfoItemProps {
  label: string;
  value: string;
}

export interface LegalItemProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface ContactItemProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface MenuItemProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}
