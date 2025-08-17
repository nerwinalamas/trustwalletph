import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StepHeaderProps {
  title: string;
  description: string;
}

export default function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    textAlign: "center",
  },
});
