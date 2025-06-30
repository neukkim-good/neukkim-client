"use client";

import { create } from "zustand";

// true면 새로운 입장
// false면 재입장
interface StatusState {
  isNew: boolean;
  setNew: (status: boolean) => void;
}

const useStatusStore = create<StatusState>()((set) => ({
  isNew: true,
  setNew: (status) => set({ isNew: status }),
}));

export default useStatusStore;
