import { COLORS } from "@/constants/colors";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  flex?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  flex = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    if (variant === "primary") {
      return [
        styles.button,
        flex && { flex: 1 },
        styles.primaryButton,
        (disabled || loading) && styles.disabledButton,
      ];
    }
    return [
      styles.button,
      flex && { flex: 1 },
      styles.secondaryButton,
    ];
  };

  const getTextStyle = () => {
    return [
      styles.buttonText,
      variant === "primary" ? styles.primaryText : styles.secondaryText,
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.primary.main} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  disabledButton: {
    backgroundColor: "#a5b4fc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#4f46e5",
  },
});
