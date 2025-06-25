"use client";

import { create } from "zustand";
import { Record } from "@/types/api/Record";

interface RecordStore {
  records: Record[];
  setRecords: (records: Record[]) => void;
  addRecord: (record: Record) => void;
  clearRecords: () => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
    })),
  clearRecords: () => set({ records: [] }),
}));
