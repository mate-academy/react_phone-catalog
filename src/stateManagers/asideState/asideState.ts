import { create } from 'zustand';

interface AsideState {
  isAsideOpen: boolean;
  toggleAside: () => void;
  closeAside: () => void;
}

export const useAsideState = create<AsideState>((set) => ({
  isAsideOpen: false,

  toggleAside: () => set((state) => ({ isAsideOpen: !state.isAsideOpen })),

  closeAside: () => set({ isAsideOpen: false }),
}));
