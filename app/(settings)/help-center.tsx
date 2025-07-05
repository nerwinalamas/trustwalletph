import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HelpCenter() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms delay (half second)

    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the Security section in Settings and tap 'Change Password'. You'll need to verify your current password before setting a new one.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "Navigate to Settings > Payment Methods to add, edit, or remove your payment options. All changes are secured with encryption.",
    },
    {
      question: "Why can't I access my account?",
      answer:
        "This could be due to several reasons: incorrect login credentials, account suspension, or network issues. Try resetting your password or contact support.",
    },
    {
      question: "How do I change my notification preferences?",
      answer:
        "Go to Settings > Notifications to customize which notifications you receive and how you want to be notified.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your data. Review our Privacy Policy for detailed information.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "Account deletion is permanent and cannot be undone. Contact our support team to request account deletion, and we'll guide you through the process.",
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: "#dbeafe" }]}>
                <Ionicons name="mail-outline" size={24} color="#1e3a8a" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Contact Support</Text>
                <Text style={styles.actionSubtitle}>
                  Get help from our team
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: "#dcfce7" }]}>
                <Ionicons name="call-outline" size={24} color="#16a34a" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Call Support</Text>
                <Text style={styles.actionSubtitle}>+1 (234) 567-8900</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: "#fef3c7" }]}>
                <Ionicons name="chatbubble-outline" size={24} color="#d97706" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Live Chat</Text>
                <Text style={styles.actionSubtitle}>
                  Chat with our support team
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Frequently Asked Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>

          {faqData.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => toggleFAQ(index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#64748b"
                />
              </View>
              {expandedFAQ === index && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HELP CATEGORIES</Text>

          <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryLeft}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#e0e7ff" }]}
              >
                <Ionicons name="person-outline" size={20} color="#1e3a8a" />
              </View>
              <View>
                <Text style={styles.categoryTitle}>Account & Profile</Text>
                <Text style={styles.categorySubtitle}>
                  Manage your account settings
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryLeft}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#e0e7ff" }]}
              >
                <Ionicons name="card-outline" size={20} color="#1e3a8a" />
              </View>
              <View>
                <Text style={styles.categoryTitle}>Payments & Billing</Text>
                <Text style={styles.categorySubtitle}>
                  Payment methods and billing
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryLeft}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#e0e7ff" }]}
              >
                <Ionicons name="shield-outline" size={20} color="#1e3a8a" />
              </View>
              <View>
                <Text style={styles.categoryTitle}>Security & Privacy</Text>
                <Text style={styles.categorySubtitle}>
                  Keep your account secure
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryLeft}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#e0e7ff" }]}
              >
                <Ionicons name="bug-outline" size={20} color="#1e3a8a" />
              </View>
              <View>
                <Text style={styles.categoryTitle}>Report a Problem</Text>
                <Text style={styles.categorySubtitle}>
                  Something not working?
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADDITIONAL RESOURCES</Text>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="pulse-outline" size={20} color="#1e3a8a" />
            <Text style={styles.resourceText}>System Status</Text>
            <Ionicons name="open-outline" size={16} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="people-outline" size={20} color="#1e3a8a" />
            <Text style={styles.resourceText}>Community Forum</Text>
            <Ionicons name="open-outline" size={16} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="book-outline" size={20} color="#1e3a8a" />
            <Text style={styles.resourceText}>User Guides</Text>
            <Ionicons name="open-outline" size={16} color="#64748b" />
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  actionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  faqItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  resourceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    flex: 1,
    marginLeft: 12,
  },
});
