import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  prefix?: string;
  suffix?: string;
  containerStyle?: ViewStyle;
  variant?: "default" | "search" | "amount";
  required?: boolean;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  containerStyle,
  variant = "default",
  required = false,
  style,
  ...props
}: InputProps) {
  const getInputContainerStyle = () => {
    let baseStyle = styles.inputContainer;

    if (error) {
      baseStyle = { ...baseStyle, ...styles.errorContainer };
    }

    return baseStyle;
  };

  const getInputStyle = () => {
    let baseStyle = styles.input;

    if (style) {
      baseStyle = { ...baseStyle, ...(style as object) };
    }

    return baseStyle;
  };

  const getPrefixStyle = () => {
    return styles.prefix;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color="#9ca3af"
            style={styles.leftIcon}
          />
        )}

        {prefix && <Text style={getPrefixStyle()}>{prefix}</Text>}

        <TextInput
          style={getInputStyle()}
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {suffix && <Text style={styles.suffix}>{suffix}</Text>}

        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={20}
            color="#9ca3af"
            style={styles.rightIcon}
          />
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 8,
  },
  required: {
    color: "#ef4444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  errorContainer: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#0f172a",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  prefix: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginRight: 4,
  },
  suffix: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginLeft: 4,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
});
