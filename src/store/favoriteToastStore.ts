import { create } from 'zustand';

interface FavoriteToastStore {
  open: boolean;
  show: () => void;
  hide: () => void;
}

export const useFavoriteToastStore = create<FavoriteToastStore>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
