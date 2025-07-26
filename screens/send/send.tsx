import BackHeader from "@/components/back-header";
import Button from "@/components/button";
import StepIndicator from "@/components/step-Indicator";
import { api } from "@/convex/_generated/api";
import StepOne from "@/screens/send/1-who-are-sending-to";
import StepTwo from "@/screens/send/2-how-much";
import StepThree from "@/screens/send/3-confirm-details";
import { SendMoneyFormData, sendMoneySchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

export interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export default function SendScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialStep = params.step ? parseInt(params.step as string) : 1;
  const [step, setStep] = useState(initialStep);

  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [qrDataProcessed, setQrDataProcessed] = useState(false); // Add this flag

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
      email: (params.email as string) || "",
      amount: params.amount ? parseFloat(params.amount as string) : 0,
      note: "",
    },
  });

  const emailValue = watch("email");
  const amount = watch("amount");
  const note = watch("note");

  // Memoize the QR data handling function to prevent recreating on every render
  const handleQRData = useCallback(async () => {
    // Only process QR data once and if it hasn't been processed yet
    if (params.fromQR !== "true" || !params.email || qrDataProcessed) {
      return;
    }

    setQrDataProcessed(true); // Set flag to prevent re-processing

    const email = params.email as string;
    const recipientName = params.recipientName as string;
    const paramAmount = params.amount ? parseFloat(params.amount as string) : 0;

    setValue("email", email);
    if (paramAmount > 0) {
      setValue("amount", paramAmount);
    }

    if (recipientName) {
      const recipient: Recipient = {
        id: "temp",
        name: recipientName,
        email: email,
        avatar: null,
      };
      setSelectedRecipient(recipient);
    }

    try {
      setIsSearching(true);
      const user = await searchUserByEmail({ email });

      if (user) {
        const recipient: Recipient = {
          id: user._id,
          name: user.fullName,
          email: user.email,
          avatar: user.profileImageUrl || null,
        };
        setSelectedRecipient(recipient);
      } else {
        setSearchError("User not found. Please check the email and try again.");
        setStep(1);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setSearchError("Error searching for user. Please try again.");
      setStep(1);
    } finally {
      setIsSearching(false);
    }
  }, [
    params.fromQR,
    params.email,
    params.recipientName,
    params.amount,
    qrDataProcessed,
    setValue,
    searchUserByEmail,
  ]);

  // Use useEffect with proper dependencies
  useEffect(() => {
    handleQRData();
  }, [handleQRData]);

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

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            control={control}
            errors={errors}
            selectedRecipient={selectedRecipient}
            setSelectedRecipient={setSelectedRecipient}
            searchError={searchError}
            setSearchError={setSearchError}
            isSearching={isSearching}
            recentRecipients={recentRecipients}
            selectRecipient={selectRecipient}
          />
        );
      case 2:
        return (
          <StepTwo
            control={control}
            errors={errors}
            selectedRecipient={selectedRecipient}
            amount={amount}
            availableBalance={availableBalance}
            trigger={trigger}
          />
        );
      case 3:
        return (
          <StepThree
            selectedRecipient={selectedRecipient}
            amount={amount}
            note={note}
          />
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
            <StepIndicator currentStep={step} totalSteps={3} />
            {renderStepContent()}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title={step === 3 ? "Confirm and Send" : "Next"}
            onPress={step === 3 ? handleSubmit(onSubmit) : goToNextStep}
            variant="primary"
            disabled={
              (step === 1 && (!emailValue || !!errors.email)) ||
              (step === 2 &&
                (amount <= 0 ||
                  !!errors.amount ||
                  amount > availableBalance)) ||
              isSearching
            }
            loading={isSearching && step === 1}
          />

          {step > 1 && (
            <Button
              title="Back"
              onPress={goToPreviousStep}
              variant="secondary"
            />
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
  buttonContainer: {
    paddingBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 8,
  },
});
