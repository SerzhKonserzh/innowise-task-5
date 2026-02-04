export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
}

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  resetRecipes: () => void;
  fetchRecipes: (params?: { limit?: number; skip?: number; mealType?: string; sortBy?: string; order?: 'asc' | 'desc' }) => Promise<void>;
  fetchRecipeById: (id: number) => Promise<IRecipe>;
  searchRecipes: (query: string) => Promise<IRecipe[]>;
}