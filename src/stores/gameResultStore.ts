"use client";

import { create } from "zustand";
import { GameResult } from "@/types/api/GameResult";

interface GameResultStore {
  results: GameResult[];
  setResults: (results: GameResult[]) => void;
  addResult: (result: GameResult) => void;
  clearResults: () => void;
}

export const useGameResultStore = create<GameResultStore>((set) => ({
  results: [],
  setResults: (results) => set({ results }),
  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),
  clearResults: () => set({ results: [] }),
}));
