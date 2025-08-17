import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const renderStep = (stepNumber: number) => (
    <React.Fragment key={stepNumber}>
      <View
        style={[
          styles.stepCircle,
          currentStep >= stepNumber ? styles.activeStep : {},
        ]}
      >
        <Text
          style={[
            styles.stepNumber,
            currentStep >= stepNumber ? styles.activeStepNumber : {},
          ]}
        >
          {stepNumber}
        </Text>
      </View>
      {stepNumber < totalSteps && (
        <View
          style={[
            styles.stepLine,
            currentStep >= stepNumber + 1 ? styles.activeStepLine : {},
          ]}
        />
      )}
    </React.Fragment>
  );

  return (
    <View style={styles.stepIndicators}>
      {Array.from({ length: totalSteps }, (_, index) => renderStep(index + 1))}
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.border.main,
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: COLORS.primary.main,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  activeStepNumber: {
    color: COLORS.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.border.main,
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: COLORS.primary.main,
  },
});
