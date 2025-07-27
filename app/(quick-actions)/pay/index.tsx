import PayScreen from "@/screens/pay/pay";
import { Ionicons } from "@expo/vector-icons";

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function Pay() {
  return <PayScreen />;
}
