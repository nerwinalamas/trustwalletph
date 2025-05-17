import BalanceCard from "@/components/balance-card";
import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Wallet() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Wallet</Text>

        {/* Balance Card */}
        <BalanceCard />

        {/* Your Cards Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Cards</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsCarousel}
        >
          {/* Credit Card */}
          <View style={[styles.card, styles.creditCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>Credit Card</Text>
              <Ionicons name="card" size={24} color="white" />
            </View>
            <Text style={styles.cardNumber}>•••• •••• •••• 4832</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>VALID THRU</Text>
                <Text style={styles.cardValue}>05/26</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardValue}>•••</Text>
              </View>
              <View style={styles.cardNetworks}>
                <View style={[styles.cardNetwork, styles.visaCard]}></View>
                <View
                  style={[styles.cardNetwork, styles.mastercardIcon]}
                ></View>
              </View>
            </View>
          </View>

          {/* Debit Card */}
          <View style={[styles.card, styles.debitCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>Debit Card</Text>
              <Ionicons name="card" size={24} color="white" />
            </View>
            <Text style={styles.cardNumber}>•••• •••• •••• 7124</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>VALID THRU</Text>
                <Text style={styles.cardValue}>09/25</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardValue}>•••</Text>
              </View>
              <View style={styles.cardNetworks}>
                <View style={styles.visaBlueCard}></View>
              </View>
            </View>
          </View>

          {/* Add Card */}
          <View style={styles.addCardContainer}>
            <View style={styles.addCardBox}>
              <Ionicons name="add" size={32} color="#94a3b8" />
              <Text style={styles.addCardText}>Add Card</Text>
            </View>
          </View>
        </ScrollView>

        {/* Pagination Indicator */}
        <View style={styles.pagination}>
          <View style={[styles.paginationDot, styles.activeDot]}></View>
          <View style={styles.paginationDot}></View>
        </View>

        {/* Link Bank Accounts Section */}
        <View style={styles.linkAccountsSection}>
          <Text style={styles.sectionTitle}>Link Bank Accounts</Text>
          <Text style={styles.linkDescription}>
            Connect your bank accounts to easily manage all your finances in one
            place.
          </Text>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect Bank Account</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 16,
    paddingBottom: 80, // Add padding for bottom nav
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  seeAllText: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  cardsCarousel: {
    marginBottom: 16,
  },
  card: {
    width: 280,
    height: 170,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditCard: {
    backgroundColor: "#4f46e5",
  },
  debitCard: {
    backgroundColor: "#3b82f6",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  cardType: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  cardNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    marginBottom: 4,
  },
  cardValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  cardNetworks: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNetwork: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginLeft: 5,
  },
  visaCard: {
    backgroundColor: "#ff0000",
  },
  mastercardIcon: {
    backgroundColor: "#ff9500",
  },
  visaBlueCard: {
    width: 45,
    height: 30,
    backgroundColor: "#0066cc",
    borderRadius: 4,
  },
  addCardContainer: {
    width: 280,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  addCardBox: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addCardText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#4f46e5",
  },
  linkAccountsSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  linkDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
    lineHeight: 20,
  },
  connectButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  connectButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
