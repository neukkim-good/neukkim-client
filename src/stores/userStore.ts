"use client";

import { create } from "zustand";
import { User } from "@/types/api/User";

interface UserStore {
  user: {
    user_id: string; // 고유 식별자
    nickname: string; // 사용자 닉네임
    token: string;
  } | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
