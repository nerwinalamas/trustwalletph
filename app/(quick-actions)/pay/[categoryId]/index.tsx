import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Company {
  id: string;
  name: string;
  type: string;
}

const companiesData: Record<string, Company[]> = {
  Electric: [
    {
      id: "meralco",
      name: "Manila Electric Company (MERALCO)",
      type: "Electric",
    },
    { id: "davao", name: "Davao Light & Power Co.", type: "Electric" },
    { id: "visayan", name: "Visayan Electric Company", type: "Electric" },
    {
      id: "cagayan",
      name: "Cagayan Electric Power & Light Co.",
      type: "Electric",
    },
  ],
  Water: [
    { id: "manila_water", name: "Manila Water Company", type: "Water" },
    { id: "maynilad", name: "Maynilad Water Services", type: "Water" },
    { id: "laguna_water", name: "Laguna Water District", type: "Water" },
    { id: "cebu_water", name: "Cebu Water District", type: "Water" },
  ],
  Internet: [
    { id: "pldt", name: "PLDT", type: "Internet" },
    { id: "globe", name: "Globe Telecom", type: "Internet" },
    { id: "converge", name: "Converge ICT", type: "Internet" },
    { id: "sky", name: "Sky Cable", type: "Internet" },
  ],
  Schools: [
    { id: "up", name: "University of the Philippines", type: "School" },
    { id: "ust", name: "University of Santo Tomas", type: "School" },
    { id: "dlsu", name: "De La Salle University", type: "School" },
    { id: "ateneo", name: "Ateneo de Manila University", type: "School" },
  ],
};

export default function CategoryList() {
  const { categoryId } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const categoryName = Array.isArray(categoryId)
    ? categoryId[0]
    : categoryId || "";
  const companies = companiesData[categoryName] || [];

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BackHeader title="Category List" />

      <View style={styles.mainContent}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#9ca3af"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search ${categoryName.toLowerCase()} companies`}
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.line} />

          <View style={styles.companiesList}>
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                href={{
                  pathname: "/(quick-actions)/pay/[categoryId]/[companyId]",
                  params: {
                    categoryId: categoryName,
                    companyId: company.id,
                  },
                }}
                asChild
              >
                <TouchableOpacity style={styles.companyItem}>
                  <View style={styles.companyIcon}>
                    <Ionicons name="business" size={20} color="#3b82f6" />
                  </View>
                  <Text style={styles.companyName}>{company.name}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    paddingTop: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#0f172a",
  },
  line: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 16,
  },
  companiesList: {
    gap: 8,
  },
  companyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  companyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  companyName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
});
