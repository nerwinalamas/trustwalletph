import { companiesData } from "@/assets/data";
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

export interface Company {
  id: string;
  name: string;
  type: string;
}

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

          {filteredCompanies.length > 0 ? (
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
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={48}
                color="#cbd5e1"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>No companies found</Text>
              <Text style={styles.emptyText}>
                {searchQuery.trim() !== ""
                  ? "No results match your search query"
                  : "No companies available for this category"}
              </Text>
            </View>
          )}
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
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },
});
