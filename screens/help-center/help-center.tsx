import BackHeader from "@/components/back-header";
import {
  ADDITIONAL_RESOURCES,
  FAQ,
  HELP_CATEGORIES,
  QUICK_ACTIONS,
} from "@/constants/help-center";
import {
  ActionCardProps,
  CategoryCardProps,
  ResourceItemProps,
} from "@/types/help-center";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HelpCenterScreen() {
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

  const renderActionCard = ({
    icon,
    iconColor,
    iconBackgroundColor,
    title,
    subtitle,
  }: ActionCardProps) => (
    <TouchableOpacity style={styles.actionCard}>
      <View style={styles.actionLeft}>
        <View
          style={[styles.actionIcon, { backgroundColor: iconBackgroundColor }]}
        >
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <View>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748b" />
    </TouchableOpacity>
  );

  const renderCategoryCard = ({ icon, title, subtitle }: CategoryCardProps) => {
    return (
      <TouchableOpacity style={styles.categoryCard}>
        <View style={styles.categoryLeft}>
          <View style={styles.categoryIcon}>
            <Ionicons name={icon} size={20} color="#1e3a8a" />
          </View>
          <View>
            <Text style={styles.categoryTitle}>{title}</Text>
            <Text style={styles.categorySubtitle}>{subtitle}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#64748b" />
      </TouchableOpacity>
    );
  };

  const renderResourceItem = ({ icon, text }: ResourceItemProps) => (
    <TouchableOpacity style={styles.resourceItem}>
      <Ionicons name={icon} size={20} color="#1e3a8a" />
      <Text style={styles.resourceText}>{text}</Text>
      <Ionicons name="open-outline" size={16} color="#64748b" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Help Center" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

          {QUICK_ACTIONS.map((action, index) => (
            <View key={index}>{renderActionCard(action)}</View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>

          {FAQ.map((faq, index) => (
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HELP CATEGORIES</Text>

          {HELP_CATEGORIES.map((category, index) => (
            <View key={index}>{renderCategoryCard(category)}</View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADDITIONAL RESOURCES</Text>

          {ADDITIONAL_RESOURCES.map((resource, index) => (
            <View key={index}>{renderResourceItem(resource)}</View>
          ))}
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
    backgroundColor: "#e0e7ff",
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
