import { COLORS } from "@/constants/colors";
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
            color={COLORS.text.muted}
            style={styles.leftIcon}
          />
        )}

        {prefix && <Text style={getPrefixStyle()}>{prefix}</Text>}

        <TextInput
          style={getInputStyle()}
          placeholderTextColor={COLORS.text.muted}
          {...props}
        />

        {suffix && <Text style={styles.suffix}>{suffix}</Text>}

        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={20}
            color={COLORS.text.muted}
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
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  required: {
    color: COLORS.text.danger,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: COLORS.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  errorContainer: {
    borderColor: COLORS.text.danger,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.text.primary,
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
    color: COLORS.text.primary,
    marginRight: 4,
  },
  suffix: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
    marginLeft: 4,
  },
  errorText: {
    color: COLORS.text.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
