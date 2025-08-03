import { Ionicons } from "@expo/vector-icons";

export interface ExplanationItem {
  title: string;
  description: string;
}

export interface LimitCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  current: number;
  limit: number;
  note: string;
  showProgress?: boolean;
}
