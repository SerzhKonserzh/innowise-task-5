'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFavoritesStore } from '@/src/store/favorites.store';
import { useAuthStore } from '@/src/store/auth.store';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import { RecipeCard } from '@/src/components/RecipeCard';
import Link from 'next/link';

export default function FavoritesPage() {
	const router = useRouter();
	const { getFavorites } = useFavoritesStore();
	const { user } = useAuthStore();
	const [favorites, setFavorites] = useState<IRecipe[]>([]);

	useEffect(() => {
		if (!user) {
			router.push('/login');
			return;
		}

		setFavorites(getFavorites());
	}, [getFavorites, user, router]);

	if (!user) {
		return <div className="container mx-auto p-4">Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center gap-4 mb-8">
					<Heart className="h-8 w-8 text-red-500 fill-red-500" />
					<h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
				</div>

				{favorites.length === 0 ? (
					<div className="text-center py-12">
						<Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
						<h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
						<p className="text-muted-foreground mb-6">
							Start adding recipes to your favorites list
						</p>
						<Button onClick={() => router.push('/')}>Browse Recipes</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{favorites.map(recipe => (
							<div
								key={recipe.id}
								className="flex justify-center w-full"
							>
								<Link
									href={`/recipes/${recipe.id}`}
									className="flex justify-center w-full"
								>
									<RecipeCard recipe={recipe} />
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
