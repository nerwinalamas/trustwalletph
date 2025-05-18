import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

// Sample recent recipients data - in a real app, this would come from an API or store
const recentRecipients: Recipient[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    avatar: null,
  },
  {
    id: "2",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    avatar: null,
  },
  {
    id: "3",
    name: "Ana Reyes",
    email: "ana.reyes@example.com",
    avatar: null,
  },
  {
    id: "4",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    avatar: null,
  },
  {
    id: "5",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    avatar: null,
  },
  {
    id: "6",
    name: "Ana Reyes",
    email: "ana.reyes@example.com",
    avatar: null,
  },
];

export default function Send() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Move to the next step
  const goToNextStep = () => {
    if (step === 1 && !selectedRecipient) return;
    if (step === 2 && (!amount || parseFloat(amount) <= 0)) return;

    setStep(step + 1);
  };

  // Going back to previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle recipient selection
  const selectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
  };

  // Handle completion of the transaction
  const handleConfirmSend = () => {
    // Here you would handle the actual transaction processing
    // Then navigate back to home or a success screen
    router.replace("/(tabs)");
  };

  // Render recipient item for the FlatList
  const renderRecipientItem = ({ item }: { item: Recipient }) => (
    <TouchableOpacity
      style={styles.recipientItem}
      onPress={() => selectRecipient(item)}
    >
      <View style={styles.avatarPlaceholder}>{/* Avatar placeholder */}</View>
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{item.name}</Text>
        <Text style={styles.recipientEmail}>{item.email}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  // Render the step indicators
  const renderStepIndicators = () => (
    <View style={styles.stepIndicators}>
      <View style={[styles.stepCircle, step >= 1 ? styles.activeStep : {}]}>
        <Text
          style={[styles.stepNumber, step >= 1 ? styles.activeStepNumber : {}]}
        >
          1
        </Text>
      </View>
      <View style={[styles.stepLine, step >= 2 ? styles.activeStepLine : {}]} />
      <View style={[styles.stepCircle, step >= 2 ? styles.activeStep : {}]}>
        <Text
          style={[styles.stepNumber, step >= 2 ? styles.activeStepNumber : {}]}
        >
          2
        </Text>
      </View>
      <View style={[styles.stepLine, step >= 3 ? styles.activeStepLine : {}]} />
      <View style={[styles.stepCircle, step >= 3 ? styles.activeStep : {}]}>
        <Text
          style={[styles.stepNumber, step >= 3 ? styles.activeStepNumber : {}]}
        >
          3
        </Text>
      </View>
    </View>
  );

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Who are you sending to?</Text>
            <Text style={styles.stepDescription}>
              Enter email address or select from recent
            </Text>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#9ca3af"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Email address"
                placeholderTextColor="#9ca3af"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <Text style={styles.sectionTitle}>Recent</Text>
            <FlatList
              data={recentRecipients}
              renderItem={renderRecipientItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        );
      case 2:
        if (!selectedRecipient) return null;

        return (
          <>
            <Text style={styles.stepTitle}>How much are you sending?</Text>
            <Text style={styles.stepDescription}>Enter amount to send</Text>

            <View style={styles.recipientCard}>
              <View style={styles.avatarPlaceholder} />
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientName}>
                  {selectedRecipient.name}
                </Text>
                <Text style={styles.recipientEmail}>
                  {selectedRecipient.email}
                </Text>
              </View>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₱</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <Text style={styles.balanceText}>Available Balance: ₱0.00</Text>

            <Text style={styles.noteLabel}>Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="What's this for?"
              placeholderTextColor="#9ca3af"
              value={note}
              onChangeText={setNote}
            />
          </>
        );
      case 3:
        if (!selectedRecipient) return null;

        return (
          <>
            <Text style={styles.stepTitle}>Confirm Details</Text>
            <Text style={styles.stepDescription}>
              Please review transaction details
            </Text>

            <View style={styles.confirmationCard}>
              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Recipient</Text>
                <Text style={styles.confirmationValue}>
                  {selectedRecipient.name}
                </Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Email</Text>
                <Text style={styles.confirmationValue}>
                  {selectedRecipient.email}
                </Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Account</Text>
                <Text style={styles.confirmationValue}>****1234</Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Amount</Text>
                <Text style={styles.confirmationValue}>₱{amount}</Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Note</Text>
                <Text style={styles.confirmationValue}>{note || "None"}</Text>
              </View>
            </View>

            <View style={styles.disclaimerContainer}>
              <Ionicons name="information-circle" size={20} color="#4f46e5" />
              <Text style={styles.disclaimerText}>
                By proceeding, you confirm that all details are correct and you
                authorize this transaction.
              </Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send</Text>
      </View>

      <View style={styles.mainContent}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {renderStepIndicators()}
            {renderStepContent()}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (step === 1 && !selectedRecipient) ||
              (step === 2 && (!amount || parseFloat(amount) <= 0))
                ? styles.disabledButton
                : {},
            ]}
            onPress={step === 3 ? handleConfirmSend : goToNextStep}
          >
            <Text style={styles.nextButtonText}>
              {step === 3 ? "Confirm and Send" : "Next"}
            </Text>
          </TouchableOpacity>

          {step > 1 && (
            <TouchableOpacity
              style={styles.backStepButton}
              onPress={goToPreviousStep}
            >
              <Text style={styles.backStepButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    paddingTop: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  stepIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#4f46e5",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  activeStepNumber: {
    color: "#ffffff",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: "#4f46e5",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
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
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    marginRight: 12,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  recipientEmail: {
    fontSize: 14,
    color: "#64748b",
  },
  buttonContainer: {
    paddingBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 8,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: "#a5b4fc",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 8,
  },
  backStepButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  backStepButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4f46e5",
  },
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0f172a",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    minWidth: 150,
  },
  balanceText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 8,
  },
  noteInput: {
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
  confirmationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  confirmationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
  },
  confirmationLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  confirmationValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    textAlign: "right",
  },
  disclaimerContainer: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
  },
});
