import type { IRecipe } from '../shared/types/recipe.interface';

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchRecipesService = async (): Promise<IRecipe[]> => {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    const data: IRecipesResponse = await response.json();
    return data.recipes;
  } catch (error) {
    throw new Error(`Failed to fetch recipes: ${(error as Error).message}`);
  }
};