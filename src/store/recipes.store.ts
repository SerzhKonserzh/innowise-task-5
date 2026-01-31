import { create } from 'zustand';
import type { IRecipe, IRecipesState } from '../shared/types/recipe.interface';
import { fetchRecipesService, fetchRecipeByIdService } from '../services/recipes.service';

export const useRecipesStore = create<IRecipesState>((set) => ({
  recipes: [],
  loading: false,
  error: null,
  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const recipes = await fetchRecipesService();
      set({ recipes, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchRecipeById: async (id: number) => {
    try {
      const recipe = await fetchRecipeByIdService(id);
      return recipe;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}));