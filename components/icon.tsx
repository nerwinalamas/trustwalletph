import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface IconProps {
  name?: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  return (
    <View style={[styles.icon]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: COLORS.primary.light,
  },
});

export default Icon;
