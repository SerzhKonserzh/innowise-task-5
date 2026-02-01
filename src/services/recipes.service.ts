import { API_URL } from '../constants';
import type { IRecipe } from '../shared/types/recipe.interface';

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchRecipesService = async (limit: number = 12, skip: number = 0): Promise<IRecipesResponse> => {
  try {
    const response = await fetch(`${API_URL}/recipes?limit=${limit}&skip=${skip}`);
    const data: IRecipesResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch recipes: ${(error as Error).message}`);
  }
};

export const fetchRecipeByIdService = async (id: number): Promise<IRecipe> => {
  try {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    if (!response.ok) {
      throw new Error(`Recipe with id ${id} not found`);
    }
    const data: IRecipe = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch recipe: ${(error as Error).message}`);
  }
};

export const searchRecipesService = async (query: string): Promise<IRecipe[]> => {
  try {
    const response = await fetch(`${API_URL}/recipes/search?q=${encodeURIComponent(query)}`);
    const data: IRecipesResponse = await response.json();
    return data.recipes;
  } catch (error) {
    throw new Error(`Failed to search recipes: ${(error as Error).message}`);
  }
};