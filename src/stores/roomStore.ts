"use client";

import { create } from "zustand";
import { Room } from "@/types/api/Room";

interface RoomStore {
  room: Room | null;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
  clearRoom: () => set({ room: null }),
}));
