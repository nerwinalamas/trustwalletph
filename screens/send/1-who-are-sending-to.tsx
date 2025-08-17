import Input from "@/components/input";
import RecipientCard from "@/components/recipient-card";
import StepHeader from "@/components/step-header";
import { COLORS } from "@/constants/colors";
import { SendMoneyFormData } from "@/utils/schema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            variant="search"
            leftIcon="search"
            placeholder="Email address"
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
            error={
              errors.email?.message ||
              (searchError !== "" ? searchError : undefined)
            }
            containerStyle={{ marginBottom: 24 }}
          />
        )}
      />

      {isSearching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.primary.main} />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  recipientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: COLORS.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedRecipientPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow.light,
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
    color: COLORS.primary.main,
    marginLeft: 8,
  },
});
