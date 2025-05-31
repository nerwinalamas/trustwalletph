// import BackHeader from "@/components/back-header";
// import { Ionicons } from "@expo/vector-icons";
// import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

// export default function Pay() {
//   return (
//     <View style={styles.container}>
//       <BackHeader title="Pay" />

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.searchContainer}>
//           <Ionicons
//             name="search"
//             size={20}
//             color="#9ca3af"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             placeholderTextColor="#9ca3af"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />
//         </View>

//         <View style={styles.line} />

//         <Text style={styles.categoriesTitle}>Categories</Text>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#0f172a",
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//     color: "#0f172a",
//   },
//   line: {
//     height: 1,
//     backgroundColor: "#e2e8f0",
//     marginVertical: 16,
//   },
//   categoriesTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#0f172a",
//     marginBottom: 8,
//   },
// });


import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface Company {
  id: string;
  name: string;
  type: string;
}

const categories: Category[] = [
  { id: "Electric", name: "Electric", icon: "flash", color: "#f59e0b" },
  { id: "Water", name: "Water", icon: "water", color: "#3b82f6" },
  { id: "Internet", name: "Cable/Internet", icon: "wifi", color: "#10b981" },
  { id: "Schools", name: "Schools", icon: "school", color: "#8b5cf6" },
];

const electricCompanies: Company[] = [
  { id: "meralco", name: "Manila Electric Company (MERALCO)", type: "Electric" },
  { id: "davao", name: "Davao Light & Power Co.", type: "Electric" },
  { id: "visayan", name: "Visayan Electric Company", type: "Electric" },
  { id: "cagayan", name: "Cagayan Electric Power & Light Co.", type: "Electric" },
  { id: "zamboanga", name: "Zamboanga City Electric Cooperative", type: "Electric" },
  { id: "benguet", name: "Benguet Electric Cooperative", type: "Electric" },
  { id: "palawan", name: "Palawan Electric Cooperative", type: "Electric" },
  { id: "bohol", name: "Bohol Light Company", type: "Electric" },
];

export default function Pay() {
  const [currentView, setCurrentView] = useState<"categories" | "companies" | "payment">("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    if (category.id === "electric") {
      setCurrentView("companies");
    }
  };

  const handleCompanyPress = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView("payment");
  };

  const handleBackPress = () => {
    if (currentView === "payment") {
      setCurrentView("companies");
    } else if (currentView === "companies") {
      setCurrentView("categories");
    }
  };

  const filteredCompanies = electricCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategories = () => (
    <>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9ca3af"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.line} />

      <Text style={styles.categoriesTitle}>Categories</Text>

      <View style={styles.categoriesGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category)}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
              <Ionicons name={category.icon} size={24} color={category.color} />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Empty slots */}
        <View style={styles.categoryCard}>
          <View style={styles.emptyCategoryIcon}>
            <Ionicons name="add" size={24} color="#9ca3af" />
          </View>
        </View>

        <View style={styles.categoryCard}>
          <View style={styles.emptyCategoryIcon}>
            <Ionicons name="add" size={24} color="#9ca3af" />
          </View>
        </View>
      </View>
    </>
  );

  const renderCompanies = () => (
    <>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9ca3af"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search electric companies"
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
          <TouchableOpacity
            key={company.id}
            style={styles.companyItem}
            onPress={() => handleCompanyPress(company)}
          >
            <View style={styles.companyIcon}>
              <Ionicons name="business" size={20} color="#3b82f6" />
            </View>
            <Text style={styles.companyName}>{company.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderPayment = () => (
    <>
      <View style={styles.companyHeader}>
        <View style={styles.companyHeaderIcon}>
          <Ionicons name="flash" size={24} color="#f59e0b" />
        </View>
        <View style={styles.companyHeaderInfo}>
          <Text style={styles.companyHeaderTitle}>Electric Company</Text>
          <Text style={styles.companyHeaderSubtitle}>Utilities</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Account/Reference Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter account or reference number"
            placeholderTextColor="#9ca3af"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₱</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Due Date (Optional)</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="dd/mm/yyyy"
              placeholderTextColor="#9ca3af"
              value={dueDate}
              onChangeText={setDueDate}
            />
            <Ionicons name="calendar" size={20} color="#9ca3af" />
          </View>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.summaryValue}>₱{amount || "0.00"}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service Fee</Text>
          <Text style={styles.summaryValue}>₱0.00</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₱{amount || "0.00"}</Text>
        </View>
      </View>

      <View style={styles.noticeContainer}>
        <Ionicons name="information-circle" size={20} color="#3b82f6" />
        <Text style={styles.noticeText}>
          Payment processing may take up to 24 hours. You will receive a notification once the payment is complete.
        </Text>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </>
  );

  const getTitle = () => {
    if (currentView === "companies") return "Electric Companies";
    if (currentView === "payment") return "Pay Bill";
    return "Pay";
  };

  return (
    <View style={styles.container}>
      <BackHeader 
        title={getTitle()} 
        onBackPress={currentView !== "categories" ? handleBackPress : undefined}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {currentView === "categories" && renderCategories()}
        {currentView === "companies" && renderCompanies()}
        {currentView === "payment" && renderPayment()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
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
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0f172a",
    textAlign: "center",
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
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  companyHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fef3c7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  companyHeaderInfo: {
    flex: 1,
  },
  companyHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
  },
  companyHeaderSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  formContainer: {
    gap: 20,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  noticeContainer: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: "#3b82f6",
    marginLeft: 8,
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});