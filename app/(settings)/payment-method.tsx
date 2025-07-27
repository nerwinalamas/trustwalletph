import BackHeader from "@/components/back-header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      cardNumber: "**** **** **** 1234",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      cardNumber: "**** **** **** 5678",
      cardHolder: "John Doe",
      expiryDate: "08/26",
      isDefault: false,
    },
  ]);

  const handleDeleteCard = (cardId: number) => {
    Alert.alert(
      "Delete Payment Method",
      "Are you sure you want to remove this payment method?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPaymentMethods((prev) =>
              prev.filter((card) => card.id !== cardId)
            );
          },
        },
      ]
    );
  };

  const handleSetDefault = (cardId: number) => {
    setPaymentMethods((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "card-outline";
      case "mastercard":
        return "card-outline";
      case "paypal":
        return "logo-paypal";
      case "apple":
        return "logo-apple";
      default:
        return "card-outline";
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case "visa":
        return "#1a56db";
      case "mastercard":
        return "#eb001b";
      case "paypal":
        return "#003087";
      case "apple":
        return "#000000";
      default:
        return "#1e3a8a";
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Payment Methods" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Payment Method */}
        <TouchableOpacity style={styles.addButton}>
          <View style={styles.addButtonContent}>
            <View style={[styles.menuIcon, styles.addIcon]}>
              <Ionicons name="add" size={24} color="#1e3a8a" />
            </View>
            <Text style={styles.addButtonText}>Add New Payment Method</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>

        {/* Payment Methods List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR PAYMENT METHODS</Text>

          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardLeft}>
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: `${getCardColor(method.type)}15` },
                    ]}
                  >
                    <Ionicons
                      name={getCardIcon(method.type)}
                      size={20}
                      color={getCardColor(method.type)}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                      {method.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultText}>Default</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardHolder}>{method.cardHolder}</Text>
                    <Text style={styles.cardExpiry}>
                      Expires {method.expiryDate}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => {
                    Alert.alert(
                      "Payment Method Options",
                      "Choose an action for this payment method",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        ...(!method.isDefault
                          ? [
                              {
                                text: "Set as Default",
                                onPress: () => handleSetDefault(method.id),
                              },
                            ]
                          : []),
                        {
                          text: "Edit",
                          onPress: () => {
                            // Navigate to edit screen
                            console.log("Edit card", method.id);
                          },
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => handleDeleteCard(method.id),
                        },
                      ]
                    );
                  }}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#1e3a8a"
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Payment Security</Text>
                <Text style={styles.menuSubtitle}>
                  Manage payment security settings
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="receipt-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Transaction History</Text>
                <Text style={styles.menuSubtitle}>
                  View your payment history
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="card-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Auto-reload</Text>
                <Text style={styles.menuSubtitle}>
                  Set up automatic balance reload
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
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
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#e0e7ff",
    borderStyle: "dashed",
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: "#e0e7ff",
    marginRight: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 12,
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLeft: {
    flexDirection: "row",
    flex: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#16a34a",
  },
  cardHolder: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 2,
  },
  cardExpiry: {
    fontSize: 12,
    color: "#94a3b8",
  },
  moreButton: {
    padding: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    marginBottom: 1,
    borderRadius: 8,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    backgroundColor: "#e0e7ff",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
});
