import { useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Avatar({ size = 64 }) {
  const { user } = useUser();

  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${
        user.lastName?.charAt(0) || ""
      }`.toUpperCase()
    : "";

  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      {user?.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.avatarImage} />
      ) : (
        <Text style={[styles.initialsText, { fontSize: size * 0.4 }]}>
          {initials || "?"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 100,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  initialsText: {
    fontWeight: "bold",
    color: "#555",
  },
});
