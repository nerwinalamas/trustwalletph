import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AlertsProps {
  description: string;
}

export default function Alerts({ description }: AlertsProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={20} color="#4f46e5" />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
  },
});
