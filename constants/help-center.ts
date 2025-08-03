import {
    ActionCardProps,
    CategoryCardProps,
    FAQItem,
    ResourceItemProps,
} from "@/types/help-center";

export const QUICK_ACTIONS: ActionCardProps[] = [
  {
    icon: "mail-outline",
    iconColor: "#1e3a8a",
    iconBackgroundColor: "#dbeafe",
    title: "Contact Support",
    subtitle: "Get help from our team",
  },
  {
    icon: "call-outline",
    iconColor: "#16a34a",
    iconBackgroundColor: "#dcfce7",
    title: "Call Support",
    subtitle: "+1 (234) 567-8900",
  },
  {
    icon: "chatbubble-outline",
    iconColor: "#d97706",
    iconBackgroundColor: "#fef3c7",
    title: "Live Chat",
    subtitle: "Chat with our support team",
  },
];

export const HELP_CATEGORIES: CategoryCardProps[] = [
  {
    icon: "person-outline",
    title: "Account & Profile",
    subtitle: "Manage your account settings",
  },
  {
    icon: "card-outline",
    title: "Payments & Billing",
    subtitle: "Payment methods and billing",
  },
  {
    icon: "shield-outline",
    title: "Security & Privacy",
    subtitle: "Keep your account secure",
  },
  {
    icon: "bug-outline",
    title: "Report a Problem",
    subtitle: "Something not working?",
  },
];

export const ADDITIONAL_RESOURCES: ResourceItemProps[] = [
  {
    icon: "pulse-outline",
    text: "System Status",
  },
  {
    icon: "people-outline",
    text: "Community Forum",
  },
  {
    icon: "book-outline",
    text: "User Guides",
  },
];

export const FAQ: FAQItem[] = [
  {
    question: "How do I send money to another user?",
    answer:
      "To send money, tap the 'Send' button on your home screen, enter the recipient's email or select from recent contacts, enter the amount, and confirm the transaction.",
  },
  {
    question: "What are the transaction limits?",
    answer:
      "Your transaction limits depend on your account verification level. Daily limits start at ₱25,000, single transaction limits at ₱1,000, and monthly limits at ₱25,000. You can view and upgrade your limits in Settings > Account Limits.",
  },
  {
    question: "How long do transactions take to process?",
    answer:
      "Most transactions are processed instantly. However, some payments to utilities and bills may take up to 24 hours to complete. You'll receive a confirmation once the payment is processed.",
  },
  {
    question: "How do I add money to my wallet?",
    answer:
      "You can add money to your wallet through bank transfers, debit cards, or by receiving money from other TrustWallet users. Go to your Wallet screen and tap 'Add Money' to see all available options.",
  },
];
