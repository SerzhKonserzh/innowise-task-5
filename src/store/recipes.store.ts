import { create } from 'zustand';
import type { IRecipe, IRecipesState } from '../shared/types/recipe.interface';
import { fetchRecipesService, fetchRecipeByIdService, searchRecipesService } from '../services/recipes.service';

export const useRecipesStore = create<IRecipesState>((set, get) => ({
  recipes: [],
  loading: false,
  error: null,
  hasMore: true,
  
  resetRecipes: () => {
    set({ recipes: [], hasMore: true });
  },
  
  fetchRecipes: async (params: { 
    limit?: number; 
    skip?: number; 
    mealType?: string; 
    sortBy?: string; 
    order?: 'asc' | 'desc' 
  } = {}) => {
    const { recipes: existingRecipes, hasMore } = get();
    const { limit = 12, skip = 0, mealType, sortBy, order } = params;
    
    const isInitialLoad = skip === 0;
    
    if (!hasMore && !isInitialLoad) {
      set({ loading: false });
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      const response = await fetchRecipesService({ limit, skip, mealType, sortBy, order });
      const newRecipes = response.recipes;
      
      let updatedRecipes: IRecipe[];
      
      if (isInitialLoad) {
        updatedRecipes = newRecipes;
      } else {
        const uniqueNewRecipes = newRecipes.filter(
          (newRecipe) => !existingRecipes.some((existingRecipe) => existingRecipe.id === newRecipe.id)
        );
        updatedRecipes = [...existingRecipes, ...uniqueNewRecipes];
      }
      
      set({
        recipes: updatedRecipes,
        loading: false,
        hasMore: response.recipes.length === limit 
      });
    } catch (error) {
      set({ 
        error: (error as Error).message, 
        loading: false,
        hasMore: false 
      });
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