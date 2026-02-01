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
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: number) => Promise<IRecipe>;
}