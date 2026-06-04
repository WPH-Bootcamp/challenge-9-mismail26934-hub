import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import { useFavoriteToastStore } from '@/store/favoriteToastStore';
import type { Movie } from '@/types/movie';

interface MovieStore {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (movie) =>
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) return state;
          useFavoriteToastStore.getState().show();
          return { favorites: [...state.favorites, movie] };
        }),
      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),
      toggleFavorite: (movie) => {
        if (get().isFavorite(movie.id)) {
          get().removeFromFavorites(movie.id);
        } else {
          get().addToFavorites(movie);
        }
      },
      isFavorite: (id) => get().favorites.some((m) => m.id === id),
    }),
    { name: STORAGE_KEYS.favorites }
  )
);
