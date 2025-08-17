import { Company } from "@/app/(quick-actions)/pay/[categoryId]";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CompanyItemProps {
  company: Company;
}

export default function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Link
      href={{
        pathname: "/(quick-actions)/pay/[categoryId]/[companyId]",
        params: {
          categoryId: company.id,
          companyId: company.id,
        },
      }}
      asChild
    >
      <TouchableOpacity style={styles.companyItem}>
        <View style={styles.companyIcon}>
          <Ionicons name="business" size={20} color="#3b82f6" />
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.companyType}>{company.type}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  companyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: COLORS.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  companyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  companyType: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
});
