import { api } from './api';
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
			url = `/recipes/meal-type/${mealType}`;
		} else {
			url = '/recipes';
		}

		const paramsObj: Record<string, any> = {
			limit,
			skip
		};

		if (sortBy) {
			paramsObj.sortBy = sortBy;
		}

		if (order) {
			paramsObj.order = order;
		}

		const response = await api.get<IRecipesResponse>(url, { params: paramsObj });
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || `Failed to fetch recipes: ${error.message}`);
	}
};

export const fetchRecipeByIdService = async (id: number): Promise<IRecipe> => {
	try {
		const response = await api.get<IRecipe>(`/recipes/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.status === 404) {
			throw new Error(`Recipe with id ${id} not found`);
		}
		throw new Error(error.response?.data?.message || `Failed to fetch recipe: ${error.message}`);
	}
};

export const searchRecipesService = async (
	query: string
): Promise<IRecipe[]> => {
	try {
		const response = await api.get<IRecipesResponse>('/recipes/search', {
			params: { q: query }
		});
		return response.data.recipes;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || `Failed to search recipes: ${error.message}`);
	}
};
