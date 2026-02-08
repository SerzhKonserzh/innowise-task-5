import { API_URL } from '../constants';
import type { IRecipe } from '../shared/types/recipe.interface';

export interface IRecipesResponse {
	recipes: IRecipe[];
	total: number;
	skip: number;
	limit: number;
}

export interface IFetchRecipesParams {
	limit?: number;
	skip?: number;
	tag?: string;
	mealType?: string;
	sortBy?: string;
	order?: 'asc' | 'desc';
}

export const fetchRecipesService = async (
	params: IFetchRecipesParams = {}
): Promise<IRecipesResponse> => {
	try {
		const { limit = 12, skip = 0, mealType, sortBy, order } = params;

		let url: string;
		if (mealType) {
			url = `${API_URL}/recipes/meal-type/${mealType}`;
		} else {
			url = `${API_URL}/recipes`;
		}

		const urlParams = new URLSearchParams();
		urlParams.append('limit', limit.toString());
		urlParams.append('skip', skip.toString());

		if (sortBy) {
			urlParams.append('sortBy', sortBy);
		}

		if (order) {
			urlParams.append('order', order);
		}

		const fullUrl = `${url}?${urlParams.toString()}`;
		const response = await fetch(fullUrl, {
			next: { revalidate: 3600 }
		});
		const data: IRecipesResponse = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to fetch recipes: ${(error as Error).message}`);
	}
};

export const fetchRecipeByIdService = async (id: number): Promise<IRecipe> => {
	try {
		const response = await fetch(`${API_URL}/recipes/${id}`, {
			next: { revalidate: 3600 }
		});
		if (!response.ok) {
			throw new Error(`Recipe with id ${id} not found`);
		}
		const data: IRecipe = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to fetch recipe: ${(error as Error).message}`);
	}
};

export const searchRecipesService = async (
	query: string
): Promise<IRecipe[]> => {
	try {
		const response = await fetch(
			`${API_URL}/recipes/search?q=${encodeURIComponent(query)}`,
			{
				cache: 'no-store'
			}
		);
		const data: IRecipesResponse = await response.json();
		return data.recipes;
	} catch (error) {
		throw new Error(`Failed to search recipes: ${(error as Error).message}`);
	}
};
