import { create } from 'zustand';
import type { IRecipe, IRecipesState } from '../shared/types/recipe.interface';
import { fetchRecipesService, fetchRecipeByIdService, searchRecipesService } from '../services/recipes.service';

export const useRecipesStore = create<IRecipesState>((set, get) => ({
  recipes: [],
  loading: false,
  error: null,
  hasMore: true,
  fetchRecipes: async (limit: number = 12, skip: number = 0) => {
    const { recipes: existingRecipes, hasMore } = get();
    
    if (!hasMore && skip > 0) return;
    
    set({ loading: true, error: null });
    try {
      const response = await fetchRecipesService(limit, skip);
      const newRecipes = response.recipes;
      
      const updatedRecipes = skip === 0 ? newRecipes : [...existingRecipes, ...newRecipes];
      
      set({
        recipes: updatedRecipes,
        loading: false,
        hasMore: updatedRecipes.length < response.total
      });
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
  },
  searchRecipes: async (query: string) => {
    try {
      const recipes = await searchRecipesService(query);
      return recipes;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}));