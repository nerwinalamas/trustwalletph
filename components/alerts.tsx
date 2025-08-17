import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AlertsProps {
  description: string;
}

export default function Alerts({ description }: AlertsProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={20} color={COLORS.primary.main} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.background.lightBlue,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary.main,
    marginLeft: 8,
  },
});
