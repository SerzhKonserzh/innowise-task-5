import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';
import FavoritesPage from '../../src/app/(private)/favorites/page';
import * as favoritesStore from '../../src/store/favorites.store';
import * as authStore from '../../src/store/auth.store';
import type { IRecipe } from '../../src/shared/types/recipe.interface';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

const mockRouter = {
	push: vi.fn()
};

const mockUser = {
	id: 1,
	username: 'testuser',
	email: 'test@example.com',
	firstName: 'Test',
	lastName: 'User',
	gender: 'male',
	image: 'test.jpg',
	token: 'test-token'
};

const mockFavorites: IRecipe[] = [
	{
		id: 1,
		name: 'Favorite Recipe 1',
		ingredients: ['ingredient1'],
		instructions: ['step1'],
		prepTimeMinutes: 30,
		cookTimeMinutes: 45,
		servings: 4,
		difficulty: 'medium',
		cuisine: 'Italian',
		caloriesPerServing: 500,
		tags: ['tag1'],
		image: 'test-image1.jpg',
		rating: 4.5,
		reviewCount: 10
	}
];

const mockAuthStore = (user: any) => {
	vi.spyOn(authStore, 'useAuthStore').mockReturnValue({ user });
};

const mockFavoritesStore = (favorites: IRecipe[]) => {
	vi.spyOn(favoritesStore, 'useFavoritesStore').mockReturnValue({
		getFavorites: vi.fn().mockReturnValue(favorites)
	});
};

const setup = (user: any = mockUser, favorites: IRecipe[] = []) => {
	mockAuthStore(user);
	mockFavoritesStore(favorites);
	return render(<FavoritesPage />);
};

describe('FavoritesPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useRouter as any).mockReturnValue(mockRouter);
	});

	describe('Authentication', () => {
		it('should redirect to login page when user is not authenticated', () => {
			setup(null, []);

			expect(mockRouter.push).toHaveBeenCalledWith('/login');
			expect(
				screen.queryByRole('heading', { name: /your favorite recipes/i })
			).not.toBeInTheDocument();
		});
	});

	describe('Empty State', () => {
		it('should display empty state message when user has no favorites', () => {
			setup(mockUser, []);

			expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
			expect(screen.getByText(/start adding recipes/i)).toBeInTheDocument();
		});
	});

	describe('Favorites List', () => {
		it('should render all favorite recipes with correct information', () => {
			setup(mockUser, mockFavorites);

			expect(
				screen.getByRole('heading', { name: /your favorite recipes/i })
			).toBeInTheDocument();
			expect(screen.getByText('Favorite Recipe 1')).toBeInTheDocument();
			expect(screen.getByText('Italian')).toBeInTheDocument();
		});
	});
});
