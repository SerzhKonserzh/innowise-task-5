import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRouter, useParams } from 'next/navigation';
import RecipeDetailPage from '../../src/app/(private)/recipes/[id]/page';
import * as recipesStore from '../../src/store/recipes.store';
import * as favoritesStore from '../../src/store/favorites.store';
import type { IRecipe } from '../../src/shared/types/recipe.interface';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useParams: vi.fn(),
	notFound: vi.fn()
}));

vi.mock('../../src/store/recipes.store', () => ({
	useRecipesStore: vi.fn()
}));

vi.mock('../../src/store/favorites.store', () => ({
	useFavoritesStore: vi.fn()
}));

vi.mock('next/image', () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	)
}));

describe('RecipeDetailPage', () => {
	const mockRouter = {
		back: vi.fn(),
		push: vi.fn()
	};

	const mockRecipe: IRecipe = {
		id: 1,
		name: 'Test Recipe',
		ingredients: ['ingredient1', 'ingredient2'],
		instructions: ['step1', 'step2'],
		prepTimeMinutes: 30,
		cookTimeMinutes: 45,
		servings: 4,
		difficulty: 'medium',
		cuisine: 'Italian',
		caloriesPerServing: 500,
		tags: ['tag1', 'tag2'],
		image: 'test-image.jpg',
		rating: 4.5,
		reviewCount: 10
	};

	beforeEach(() => {
		vi.clearAllMocks();
		(useRouter as any).mockReturnValue(mockRouter);
		(useParams as any).mockReturnValue({ id: '1' });
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders loading state initially', () => {
		(
			recipesStore.useRecipesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			recipes: [],
			fetchRecipeById: vi.fn()
		});
		(
			favoritesStore.useFavoritesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			addFavorite: vi.fn(),
			removeFavorite: vi.fn(),
			isFavorite: vi.fn().mockReturnValue(false)
		});

		render(<RecipeDetailPage />);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders recipe details when loaded', async () => {
		(
			recipesStore.useRecipesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			recipes: [mockRecipe],
			fetchRecipeById: vi.fn().mockResolvedValue(mockRecipe)
		});
		(
			favoritesStore.useFavoritesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			addFavorite: vi.fn(),
			removeFavorite: vi.fn(),
			isFavorite: vi.fn().mockReturnValue(false)
		});

		render(<RecipeDetailPage />);

		await waitFor(() => {
			expect(screen.getByText('Test Recipe')).toBeInTheDocument();
		});

		expect(screen.getByText('Test Recipe')).toBeInTheDocument();
		expect(screen.getByText('Italian')).toBeInTheDocument();
		expect(screen.getByText('30m')).toBeInTheDocument();
		expect(screen.getByText('45m')).toBeInTheDocument();
		expect(screen.getByText('500')).toBeInTheDocument();
		expect(screen.getByText('ingredient1')).toBeInTheDocument();
		expect(screen.getByText('step1')).toBeInTheDocument();
	});

	it('handles favorite toggle', async () => {
		const mockAddFavorite = vi.fn();
		const mockRemoveFavorite = vi.fn();
		const mockIsFavorite = vi.fn().mockReturnValue(false);

		(
			recipesStore.useRecipesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			recipes: [mockRecipe],
			fetchRecipeById: vi.fn().mockResolvedValue(mockRecipe)
		});
		(
			favoritesStore.useFavoritesStore as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			addFavorite: mockAddFavorite,
			removeFavorite: mockRemoveFavorite,
			isFavorite: mockIsFavorite
		});

		render(<RecipeDetailPage />);

		await waitFor(() => {
			expect(screen.getByText('Test Recipe')).toBeInTheDocument();
		});

		const favoriteButton = screen.getByText('Save to favorites');
		favoriteButton.click();

		expect(mockAddFavorite).toHaveBeenCalledWith(mockRecipe);
	});
});
