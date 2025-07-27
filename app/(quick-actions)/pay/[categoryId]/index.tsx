import { companiesData } from "@/assets/data";
import BackHeader from "@/components/back-header";
import CompanyItem from "@/components/cards/company-item";
import EmptyState from "@/components/empty-state";
import Input from "@/components/input";
import Separator from "@/components/separator";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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

  const getEmptyStateProps = () => {
    if (searchQuery.trim() !== "") {
      return {
        title: "No companies found",
        description: "No results match your search query",
      };
    }
    return {
      icon: "business-outline" as const,
      title: "No companies available",
      description: "No companies available for this category",
    };
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Category List" />

      <View style={styles.mainContent}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Input
            variant="search"
            leftIcon="search"
            placeholder={`Search ${categoryName.toLowerCase()} companies`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Separator />

          {filteredCompanies.length > 0 ? (
            <View style={styles.companiesList}>
              {filteredCompanies.map((company) => (
                <CompanyItem key={company.id} company={company} />
              ))}
            </View>
          ) : (
            <EmptyState {...getEmptyStateProps()} />
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
  companiesList: {
    gap: 8,
  },
});
