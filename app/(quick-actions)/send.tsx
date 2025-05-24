import Avatar from "@/components/avatar";
import BackHeader from "@/components/back-header";
import { api } from "@/convex/_generated/api";
import { SendMoneyFormData, sendMoneySchema } from "@/utils/schema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
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

export default function Send() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const searchUserByEmail = useMutation(api.users.searchUserByEmail);
  const sendMoney = useMutation(api.users.sendMoney);
  const wallet = useQuery(api.users.getUserWallet);
  const availableBalance = wallet?.balance || 0;
  const recentRecipients = useQuery(api.users.getRecentRecipients) || [];

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<SendMoneyFormData>({
    resolver: zodResolver(sendMoneySchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      amount: 0,
      note: "",
    },
  });

  const emailValue = watch("email");
  const amount = watch("amount");
  const note = watch("note");

  // Move to the next step
  const goToNextStep = async () => {
    if (step === 1) {
      // Check if email is valid
      const isValid = await trigger("email");
      if (!isValid) return;

      if (!selectedRecipient) {
        // Search for user before moving to next step
        await searchUser(getValues("email"));
        return; // Don't proceed yet, wait for search to complete
      }
    }

    if (step === 2 && (!amount || errors.amount)) return;

    setStep(step + 1);
  };

  // Search for user by email
  const searchUser = async (email: string) => {
    if (!email || isSearching) return;

    setIsSearching(true);
    setSearchError("");

    try {
      const user = await searchUserByEmail({ email });
      console.log("Search result:", user);

      if (user) {
        const recipient: Recipient = {
          id: user._id,
          name: user.fullName,
          email: user.email,
          avatar: user.profileImageUrl || null,
        };

        setSelectedRecipient(recipient);
        setValue("email", recipient.email, { shouldValidate: true });
        setSearchError("");
        setStep(2);
      } else {
        setSearchError("User not found. Please check the email and try again.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setSearchError("Error searching for user. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Going back to previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      if (step === 2) {
        // Clear amount when going back from step 2 to 1
        setValue("amount", 0);
      }
      setStep(step - 1);
    }
  };

  // Handle recipient selection
  const selectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setValue("email", recipient.email, { shouldValidate: true });
    trigger("email");
  };

  // Handle form submission
  const onSubmit = async (data: SendMoneyFormData) => {
    if (!selectedRecipient) return;

    try {
      await sendMoney({
        recipientEmail: selectedRecipient.email,
        amount: data.amount,
        note: data.note,
      });

      router.replace("/(tabs)");
    } catch (error) {
      console.log("Transaction failed. Please try again:", error);
    }
  };

  // Render recipient item for the FlatList
  const renderRecipientItem = ({ item }: { item: Recipient }) => (
    <TouchableOpacity
      style={styles.recipientItem}
      onPress={() => selectRecipient(item)}
    >
      <Avatar size={40} imageUrl={item.avatar} name={item.name} />
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
                      if (
                        selectedRecipient &&
                        text !== selectedRecipient.email
                      ) {
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
              <View style={styles.selectedRecipientPreview}>
                <Avatar
                  size={40}
                  imageUrl={selectedRecipient.avatar}
                  name={selectedRecipient.name}
                />
                <View style={styles.recipientInfo}>
                  <Text style={styles.recipientName}>
                    {selectedRecipient.name}
                  </Text>
                  <Text style={styles.recipientEmail}>
                    {selectedRecipient.email}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedRecipient(null)}>
                  <Ionicons name="close" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            )}

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

        const remainingBalance = availableBalance - amount;

        return (
          <>
            <Text style={styles.stepTitle}>How much are you sending?</Text>
            <Text style={styles.stepDescription}>Enter amount to send</Text>

            <View style={styles.recipientCard}>
              <Avatar
                size={40}
                imageUrl={selectedRecipient.avatar}
                name={selectedRecipient.name}
              />
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
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.amountInput}
                    value={value === 0 ? "" : String(value)}
                    onChangeText={(text) => {
                      const numericValue =
                        text === "" ? 0 : Number(text.replace(/[^0-9.]/g, ""));

                      onChange(numericValue);
                      trigger("amount");
                    }}
                    onBlur={onBlur}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="#9ca3af"
                  />
                )}
              />
            </View>

            {/* {errors.amount && (
              <Text style={[styles.errorText, styles.amountError]}>
                {errors.amount.message}
              </Text>
            )} */}

            <Text
              style={[
                styles.balanceText,
                amount > 0 && remainingBalance < 0
                  ? styles.negativeBalance
                  : {},
              ]}
            >
              Available Balance: ₱
              {(amount > 0
                ? remainingBalance
                : availableBalance
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.noteLabel}>Note (Optional)</Text>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="What's this for?"
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
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
      <BackHeader title="Send" />

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
              (step === 1 && (!emailValue || !!errors.email)) ||
              (step === 2 &&
                (amount <= 0 ||
                  !!errors.amount ||
                  amount > availableBalance)) ||
              isSearching
                ? styles.disabledButton
                : {},
            ]}
            onPress={step === 3 ? handleSubmit(onSubmit) : goToNextStep}
            disabled={
              (step === 1 && (!emailValue || !!errors.email)) ||
              (step === 2 &&
                (amount <= 0 ||
                  !!errors.amount ||
                  amount > availableBalance)) ||
              isSearching
            }
          >
            {isSearching && step === 1 ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.nextButtonText}>
                {step === 3 ? "Confirm and Send" : "Next"}
              </Text>
            )}
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
  recipientInfo: {
    flex: 1,
    marginLeft: 12,
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
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  amountError: {
    textAlign: "center",
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
  negativeBalance: {
    color: "#ef4444", // Red for negative balance
  },
});
