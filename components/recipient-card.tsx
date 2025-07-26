import Avatar from "@/components/avatar";
import { Recipient } from "@/screens/send/send";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface RecipientCardProps {
  recipient: Recipient;
  onPress?: () => void;
  showChevron?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  style?: ViewStyle;
  avatarSize?: number;
  disabled?: boolean;
}

export default function RecipientCard({
  recipient,
  onPress,
  showChevron = false,
  showCloseButton = false,
  onClose,
  style,
  avatarSize = 40,
  disabled = false,
}: RecipientCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;
  const cardProps = onPress
    ? {
        onPress,
        disabled,
        activeOpacity: 0.7,
      }
    : {};

  return (
    <CardWrapper style={[styles.card, style]} {...cardProps}>
      <Avatar
        size={avatarSize}
        imageUrl={recipient.avatar}
        name={recipient.name}
      />

      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{recipient.name}</Text>
        <Text style={styles.recipientEmail}>{recipient.email}</Text>
      </View>

      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}

      {showCloseButton && onClose && (
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recipientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  recipientEmail: {
    fontSize: 14,
    color: "#64748b",
  },
});
