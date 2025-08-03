import { ExplanationItem } from "@/types/account-limits";

export const EXPLANATIONS: ExplanationItem[] = [
  {
    title: "Daily Limits",
    description:
      "Maximum amount you can transact in a 24-hour period. Resets every midnight.",
  },
  {
    title: "Monthly Limits",
    description:
      "Total transaction volume allowed per calendar month. Helps manage spending patterns.",
  },
  {
    title: "Transaction Limits",
    description:
      "Maximum amount allowed for a single transaction. Provides security against large unauthorized transfers.",
  },
  {
    title: "Balance Limits",
    description:
      "Maximum amount you can store in your account. Upgrade your account for higher limits.",
  },
];
