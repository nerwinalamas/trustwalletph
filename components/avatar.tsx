import { useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";

interface AvatarProps {
  size?: number;
  imageUrl?: string | null;
  name?: string;
}

export default function Avatar({ size = 64, imageUrl, name }: AvatarProps) {
  const { user } = useUser();

  const displayImageUrl = imageUrl ?? user?.imageUrl;
  const displayName = name ?? `${user?.firstName} ${user?.lastName}`;

  const initials =
    displayName
      ?.split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2) || "?";

  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      {displayImageUrl ? (
        <Image source={{ uri: displayImageUrl }} style={styles.avatarImage} />
      ) : (
        <Text style={[styles.initialsText, { fontSize: size * 0.4 }]}>
          {initials}
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
