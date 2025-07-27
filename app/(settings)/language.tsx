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
      <BackHeader title="Language" />

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
});
