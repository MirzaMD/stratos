// src/store/useCgpaStore.ts
import { create } from "zustand";

type Store = {
  sgpas: Record<number, number | null>;
  cgpa: number | null;
  setSgpa: (sem: number, sgpa: number) => void;
  setCgpa: (cgpa: number) => void;
};

export const useCgpaStore = create<Store>((set, get) => ({
  sgpas: {},
  cgpa: null,
  setSgpa: (sem, sgpa) => {
    const newSgpas = { ...get().sgpas, [sem]: sgpa };
    const values = Object.values(newSgpas).filter((v) => v !== null) as number[];
    const newCgpa = values.length > 0
      ? parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2))
      : null;
    set({ sgpas: newSgpas, cgpa: newCgpa });
  },
  setCgpa: (cgpa) => set({ cgpa }),
}));
