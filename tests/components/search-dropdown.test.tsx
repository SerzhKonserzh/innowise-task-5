import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchDropdown } from '../../src/components/SearchDropdown';
import * as recipesStore from '../../src/store/recipes.store';
import type { IRecipe } from '../../src/shared/types/recipe.interface';

vi.mock('../../src/hooks/useDebounce', () => ({
	useDebounce: vi.fn((value: string) => value)
}));

const mockRecipe: Partial<IRecipe> = {
	id: 1,
	name: 'Test Recipe',
	image: 'test-image.jpg',
	ingredients: ['ingredient1'],
	instructions: ['step1'],
	prepTimeMinutes: 30,
	cookTimeMinutes: 45,
	servings: 4,
	difficulty: 'medium',
	cuisine: 'Italian',
	caloriesPerServing: 500,
	tags: ['tag1'],
	rating: 4.5,
	reviewCount: 10
};

const mockSearchResults: Partial<IRecipe>[] = [
	{ ...mockRecipe, id: 1, name: 'Test Recipe 1' },
	{ ...mockRecipe, id: 2, name: 'Test Recipe 2' }
];

const setup = (searchResults: Partial<IRecipe>[] = []) => {
	const mockSearchRecipes = vi
		.fn()
		.mockResolvedValue(searchResults.map(r => ({ ...mockRecipe, ...r })));

	vi.spyOn(recipesStore, 'useRecipesStore').mockReturnValue({
		searchRecipes: mockSearchRecipes
	});

	return {
		...render(<SearchDropdown />),
		mockSearchRecipes
	};
};

describe('SearchDropdown', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Rendering', () => {
		it('should render search input with correct placeholder', () => {
			setup();

			expect(
				screen.getByPlaceholderText('Search recipes...')
			).toBeInTheDocument();
		});
	});

	describe('Search Functionality', () => {
		it('should call searchRecipes when user types in search input', async () => {
			const { mockSearchRecipes } = setup(mockSearchResults);

			const searchInput = screen.getByPlaceholderText('Search recipes...');
			fireEvent.change(searchInput, { target: { value: 'test' } });

			await waitFor(() => {
				expect(mockSearchRecipes).toHaveBeenCalledWith('test');
			});
		});
	});

	describe('Search Results', () => {
		it('should display search results when search returns data', async () => {
			setup(mockSearchResults);

			const searchInput = screen.getByPlaceholderText('Search recipes...');
			fireEvent.change(searchInput, { target: { value: 'test' } });

			await waitFor(() => {
				expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
				expect(screen.getByText('Test Recipe 2')).toBeInTheDocument();
			});
		});
	});

	describe('User Interaction', () => {
		it('should clear search term and close dropdown when a result is clicked', async () => {
			setup([mockRecipe]);

			const searchInput = screen.getByPlaceholderText('Search recipes...');
			fireEvent.change(searchInput, { target: { value: 'test' } });

			await waitFor(() => {
				expect(screen.getByText('Test Recipe')).toBeInTheDocument();
			});

			const resultLink = screen.getByText('Test Recipe');
			fireEvent.click(resultLink);

			expect(searchInput).toHaveValue('');
			expect(screen.queryByText('Test Recipe')).not.toBeInTheDocument();
		});
	});
});
