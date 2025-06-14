import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type LanguageType = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

interface LanguageItemProps {
  language: LanguageType;
  isSelected: boolean;
}

export default function Language() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const languages = [
    {
      code: "en-US",
      name: "English (US)",
      nativeName: "English",
      flag: "🇺🇸",
    },
    {
      code: "en-GB",
      name: "English (UK)",
      nativeName: "English",
      flag: "🇬🇧",
    },
    {
      code: "fil-PH",
      name: "Filipino",
      nativeName: "Filipino",
      flag: "🇵🇭",
    },
    {
      code: "es-ES",
      name: "Spanish",
      nativeName: "Español",
      flag: "🇪🇸",
    },
    {
      code: "fr-FR",
      name: "French",
      nativeName: "Français",
      flag: "🇫🇷",
    },
    {
      code: "de-DE",
      name: "German",
      nativeName: "Deutsch",
      flag: "🇩🇪",
    },
    {
      code: "it-IT",
      name: "Italian",
      nativeName: "Italiano",
      flag: "🇮🇹",
    },
    {
      code: "pt-PT",
      name: "Portuguese",
      nativeName: "Português",
      flag: "🇵🇹",
    },
    {
      code: "ru-RU",
      name: "Russian",
      nativeName: "Русский",
      flag: "🇷🇺",
    },
    {
      code: "zh-CN",
      name: "Chinese (Simplified)",
      nativeName: "简体中文",
      flag: "🇨🇳",
    },
    {
      code: "zh-TW",
      name: "Chinese (Traditional)",
      nativeName: "繁體中文",
      flag: "🇹🇼",
    },
    {
      code: "ja-JP",
      name: "Japanese",
      nativeName: "日本語",
      flag: "🇯🇵",
    },
    {
      code: "ko-KR",
      name: "Korean",
      nativeName: "한국어",
      flag: "🇰🇷",
    },
    {
      code: "ar-SA",
      name: "Arabic",
      nativeName: "العربية",
      flag: "🇸🇦",
    },
    {
      code: "hi-IN",
      name: "Hindi",
      nativeName: "हिन्दी",
      flag: "🇮🇳",
    },
    {
      code: "th-TH",
      name: "Thai",
      nativeName: "ไทย",
      flag: "🇹🇭",
    },
    {
      code: "vi-VN",
      name: "Vietnamese",
      nativeName: "Tiếng Việt",
      flag: "🇻🇳",
    },
    {
      code: "id-ID",
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
      flag: "🇮🇩",
    },
    {
      code: "ms-MY",
      name: "Malay",
      nativeName: "Bahasa Melayu",
      flag: "🇲🇾",
    },
  ];

  // Group languages by region
  const popularLanguages = languages.filter((lang) =>
    ["en-US", "fil-PH", "tl-PH", "zh-CN", "es-ES"].includes(lang.code)
  );

  const allLanguages = languages.filter(
    (lang) =>
      !["en-US", "fil-PH", "tl-PH", "zh-CN", "es-ES"].includes(lang.code)
  );

  const handleLanguageSelect = (languageCode: string) => {
    Alert.alert(
      "Change Language",
      "Are you sure you want to change the app language? The app will restart to apply the changes.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Change",
          onPress: () => {
            setSelectedLanguage(languageCode);
            // Here you would typically save the language preference
            // and restart the app or reload the language resources
            console.log("Language changed to:", languageCode);
          },
        },
      ]
    );
  };

  const LanguageItem = ({ language, isSelected }: LanguageItemProps) => (
    <TouchableOpacity
      style={[styles.languageItem, isSelected && styles.selectedLanguageItem]}
      onPress={() => handleLanguageSelect(language.code)}
    >
      <View style={styles.languageLeft}>
        <Text style={styles.flagText}>{language.flag}</Text>
        <View style={styles.languageTextContainer}>
          <Text
            style={[styles.languageName, isSelected && styles.selectedText]}
          >
            {language.name}
          </Text>
          <Text
            style={[
              styles.languageNativeName,
              isSelected && styles.selectedSubtext,
            ]}
          >
            {language.nativeName}
          </Text>
        </View>
      </View>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Popular Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POPULAR</Text>
          <View style={styles.languagesList}>
            {popularLanguages.map((language) => (
              <LanguageItem
                key={language.code}
                language={language}
                isSelected={selectedLanguage === language.code}
              />
            ))}
          </View>
        </View>

        {/* All Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ALL LANGUAGES</Text>
          <View style={styles.languagesList}>
            {allLanguages.map((language) => (
              <LanguageItem
                key={language.code}
                language={language}
                isSelected={selectedLanguage === language.code}
              />
            ))}
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LANGUAGE SETTINGS</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="download-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Download Languages</Text>
                <Text style={styles.menuSubtitle}>
                  Download languages for offline use
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.icon]}>
                <Ionicons name="refresh-outline" size={20} color="#1e3a8a" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Auto-detect Language</Text>
                <Text style={styles.menuSubtitle}>
                  Use device language settings
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
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
  languagesList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  selectedLanguageItem: {
    backgroundColor: "#f0f9ff",
  },
  languageLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flagText: {
    fontSize: 24,
    marginRight: 12,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  languageNativeName: {
    fontSize: 14,
    color: "#64748b",
  },
  selectedText: {
    color: "#1e3a8a",
  },
  selectedSubtext: {
    color: "#3b82f6",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
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
