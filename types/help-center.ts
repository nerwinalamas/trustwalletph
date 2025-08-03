import { Ionicons } from "@expo/vector-icons";

export interface ActionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackgroundColor: string;
  title: string;
  subtitle: string;
}

export interface CategoryCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

export interface ResourceItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
