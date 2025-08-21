"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppleThemeColor = "red" | "green";

interface ThemeStore {
  appleColor: AppleThemeColor;
  setAppleColor: (color: AppleThemeColor) => void;
  toggleAppleColor: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      appleColor: "red",
      setAppleColor: (color) => set({ appleColor: color }),
      toggleAppleColor: () =>
        set({ appleColor: get().appleColor === "red" ? "green" : "red" }),
    }),
    {
      name: "theme-store",
      partialize: (state) => ({ appleColor: state.appleColor }),
    }
  )
);
