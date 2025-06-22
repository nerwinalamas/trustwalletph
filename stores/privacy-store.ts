import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PrivacySettings {
//   profileVisibility: boolean;
  hideTransactionAmounts: boolean;
}

interface PrivacyStore {
  settings: PrivacySettings;
  updateSetting: (key: keyof PrivacySettings, value: boolean) => void;
  toggleSetting: (key: keyof PrivacySettings) => void;
}

export const usePrivacyStore = create<PrivacyStore>()(
  persist(
    (set) => ({
      settings: {
        // profileVisibility: true,
        hideTransactionAmounts: false,
      },
      updateSetting: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      toggleSetting: (key) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: !state.settings[key],
          },
        })),
    }),
    {
      name: "privacy-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
