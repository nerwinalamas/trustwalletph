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
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    if (variant === "primary") {
      return [
        styles.nextButton,
        (disabled || loading) && styles.disabledButton,
      ];
    }
    return styles.backStepButton;
  };

  const getTextStyle = () => {
    return variant === "primary"
      ? styles.nextButtonText
      : styles.backStepButtonText;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: "#a5b4fc",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  backStepButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  backStepButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4f46e5",
  },
});
