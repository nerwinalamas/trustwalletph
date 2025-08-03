import BackHeader from "@/components/back-header";
import CategoryCard from "@/components/cards/category-card";
import CompanyItem from "@/components/cards/company-item";
import EmptyState from "@/components/empty-state";
import Input from "@/components/input";
import Separator from "@/components/separator";
import { categories, companiesData } from "@/constants/pay";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function PayScreen() {
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
                    <CompanyItem key={company.id} company={company} />
                  ))}
                </View>
              ) : (
                <EmptyState
                  title="No companies found"
                  description="No results match your search query"
                />
              )}
            </>
          )}

          <Separator />

          <Text style={styles.categoriesTitle}>Categories</Text>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginVertical: 16,
  },
  searchResults: {
    gap: 8,
  },
});
