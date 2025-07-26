import RecipientCard from "@/components/recipient-card";
import StepHeader from "@/components/step-header";
import { SendMoneyFormData } from "@/utils/schema";
import { Ionicons } from "@expo/vector-icons";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Recipient } from "./send";

interface StepOneProps {
  control: Control<SendMoneyFormData>;
  errors: FieldErrors<SendMoneyFormData>;
  selectedRecipient: Recipient | null;
  setSelectedRecipient: (recipient: Recipient | null) => void;
  searchError: string;
  setSearchError: (error: string) => void;
  isSearching: boolean;
  recentRecipients: Recipient[];
  selectRecipient: (recipient: Recipient) => void;
}

export default function StepOne({
  control,
  errors,
  selectedRecipient,
  setSelectedRecipient,
  searchError,
  setSearchError,
  isSearching,
  recentRecipients,
  selectRecipient,
}: StepOneProps) {
  const renderRecipientItem = ({ item }: { item: Recipient }) => (
    <RecipientCard
      recipient={item}
      onPress={() => selectRecipient(item)}
      showChevron
      style={styles.recipientItem}
    />
  );

  return (
    <>
      <StepHeader
        title="Who are you sending to?"
        description="Enter email address or select from recent"
      />

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9ca3af"
          style={styles.searchIcon}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.searchInput}
              placeholder="Email address"
              placeholderTextColor="#9ca3af"
              value={value}
              onChangeText={(text) => {
                onChange(text);
                if (selectedRecipient && text !== selectedRecipient.email) {
                  setSelectedRecipient(null);
                }
                setSearchError("");
              }}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
      </View>

      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {searchError !== "" && (
        <Text style={styles.errorText}>{searchError}</Text>
      )}

      {isSearching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4f46e5" />
          <Text style={styles.loadingText}>Searching for user...</Text>
        </View>
      )}

      {selectedRecipient && (
        <RecipientCard
          recipient={selectedRecipient}
          showCloseButton
          onClose={() => setSelectedRecipient(null)}
          style={styles.selectedRecipientPreview}
        />
      )}

      {recentRecipients.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Recent</Text>
          <FlatList
            data={recentRecipients}
            renderItem={renderRecipientItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
  },
  recipientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  selectedRecipientPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
  },
});
