import { Category } from "@/app/(quick-actions)/pay";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      key={category.id}
      href={{
        pathname: "/(quick-actions)/pay/[categoryId]",
        params: { categoryId: category.id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.categoryCard}>
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: `${category.color}20` },
          ]}
        >
          <Ionicons name={category.icon} size={24} color={category.color} />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: "30%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: COLORS.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.primary,
    textAlign: "center",
  },
});
