"use client";

import { create } from "zustand";
import { Participant } from "@/types/api/Participant";

interface ParticipantStore {
  participants: Participant[];
  setParticipants: (list: Participant[]) => void;
  addParticipant: (p: Participant) => void;
  removeParticipant: (userId: string) => void;
  clearParticipants: () => void;
}

export const useParticipantStore = create<ParticipantStore>((set) => ({
  participants: [],
  setParticipants: (list) => set({ participants: list }),
  addParticipant: (p) =>
    set((state) => ({
      participants: [...state.participants, p],
    })),
  removeParticipant: (userId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.user_id !== userId),
    })),
  clearParticipants: () => set({ participants: [] }),
}));
