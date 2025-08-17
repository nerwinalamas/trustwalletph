export const COLORS = {
  // Primary Colors
  primary: {
    main: "#4f46e5", // Primary brand color (indigo-600)
    dark: "#1e3a8a", // Dark blue for icons and text
    light: "#e0e7ff", // Light blue for backgrounds
    lighter: "#dbeafe", // Even lighter blue
    green: "#10b981", // Light Green
  },

  // Background Colors
  background: {
    main: "#f8fafc", // Main app background (slate-50)
    card: "#ffffff", // Card backgrounds
    surface: "#f1f5f9", // Surface backgrounds (slate-100)
    danger: "#fee2e2", // Logout backgrounds
    lightBlue: "#eff6ff",
  },

  // Text Colors
  text: {
    primary: "#0f172a", // Primary text (slate-900)
    secondary: "#334155", // Secondary text (slate-700)
    tertiary: "#64748b", // Tertiary text (slate-500)
    muted: "#9ca3af", // Muted text (gray-400)
    light: "#6b7280", // Light text (gray-500)
    danger: "#ef4444",
  },

  // Border Colors
  border: {
    main: "#e2e8f0", // Main border color (slate-200)
    light: "#f1f5f9", // Light border (slate-100)
  },

  // Transaction Colors
  transaction: {
    income: {
      color: "#22c55e", // Green for income amounts
      background: "#dcfce7", // Light green background
    },
    expense: {
      color: "#ef4444", // Red for expense amounts (red-500)
      background: "#fee2e2", // Light red background
      rose: "#f43f5e", // Rose color for send transactions
    },
  },

  // Status Colors
  status: {
    success: "#22c55e", // Green
    error: "#ef4444", // Red
    warning: "#f59e0b", // Amber
    info: "#3b82f6", // Blue
  },

  // White, Transparent and Black
  white: "#ffffff",
  transparent: "transparent",
  black: "#000000",

  // Opacity variants for white
  whiteOpacity: {
    80: "rgba(255, 255, 255, 0.8)",
    60: "rgba(255, 255, 255, 0.6)",
    40: "rgba(255, 255, 255, 0.4)",
    20: "rgba(255, 255, 255, 0.2)",
  },

  // Opacity variants for black
  blackOpacity: {
    80: "rgba(0, 0, 0, 0.8)",
    60: "rgba(0, 0, 0, 0.6)",
    40: "rgba(0, 0, 0, 0.4)",
    20: "rgba(0, 0, 0, 0.2)",
  },

  // Shadow Colors
  shadow: {
    primary: "#1e3a8a", // Primary shadow color
    light: "#000000", // Standard shadow
  },
} as const;

// Type for autocomplete support
export type ColorKey = keyof typeof COLORS;
export type PrimaryColorKey = keyof typeof COLORS.primary;
export type BackgroundColorKey = keyof typeof COLORS.background;
export type TextColorKey = keyof typeof COLORS.text;
export type TransactionColorKey = keyof typeof COLORS.transaction;
