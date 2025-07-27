import { categories, companiesData } from "@/assets/data";
import BackHeader from "@/components/back-header";
import Input from "@/components/input";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function Pay() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const allCompanies = Object.values(companiesData).flat();

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredCompanies = allCompanies.filter((company) =>
    company.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const showSearchResults = debouncedQuery.trim() !== "";

  return (
    <View style={styles.container}>
      <BackHeader title="Pay" />

      <View style={styles.mainContent}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Input
            variant="search"
            leftIcon="search"
            placeholder="Search companies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {showSearchResults && (
            <>
              <Text style={styles.sectionTitle}>
                Search Results ({filteredCompanies.length})
              </Text>

              {filteredCompanies.length > 0 ? (
                <View style={styles.searchResults}>
                  {filteredCompanies.map((company) => (
                    <Link
                      key={company.id}
                      href={{
                        pathname:
                          "/(quick-actions)/pay/[categoryId]/[companyId]",
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
                    No results match your search query
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.line} />

          <Text style={styles.categoriesTitle}>Categories</Text>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
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
                    <Ionicons
                      name={category.icon}
                      size={24}
                      color={category.color}
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
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
  line: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 16,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
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
    color: "#0f172a",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginVertical: 16,
  },
  searchResults: {
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
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  companyType: {
    fontSize: 14,
    color: "#64748b",
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
