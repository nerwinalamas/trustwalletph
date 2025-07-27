import { StyleSheet, View } from "react-native";

interface SeparatorProps {
  color?: string;
  height?: number;
  marginVertical?: number;
}

export default function Separator({
  color = "#e2e8f0",
  height = 1,
  marginVertical = 16,
}: SeparatorProps) {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: color,
          height,
          marginVertical,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
  },
});
