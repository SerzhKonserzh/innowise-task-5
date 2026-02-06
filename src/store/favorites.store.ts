import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import { useAuthStore } from './auth.store';

export interface IFavoritesState {
  favorites: Record<number, IRecipe[]>; //user's favorites based on id
  addFavorite: (recipe: IRecipe) => void;
  removeFavorite: (recipeId: number) => void;
  getFavorites: () => IRecipe[];
  isFavorite: (recipeId: number) => boolean;
}

export const useFavoritesStore = create<IFavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},

      addFavorite: (recipe: IRecipe) => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) return;

        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          if (!userFavorites.some(fav => fav.id === recipe.id)) {
            return {
              favorites: {
                ...state.favorites,
                [userId]: [...userFavorites, recipe]
              }
            };
          }
          return state;
        });
      },

      removeFavorite: (recipeId: number) => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) return;

        set((state) => ({
          favorites: {
            ...state.favorites,
            [userId]: (state.favorites[userId] || []).filter(
              (recipe) => recipe.id !== recipeId
            )
          }
        }));
      },

      getFavorites: () => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) return [];
        return get().favorites[userId] || [];
      },

      isFavorite: (recipeId: number) => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) return false;
        const userFavorites = get().favorites[userId] || [];
        return userFavorites.some(recipe => recipe.id === recipeId);
      }
    }),
    {
      name: 'favorites-storage', 
    }
  )
);