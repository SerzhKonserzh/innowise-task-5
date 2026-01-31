'use client';

import { useEffect } from 'react';
import { RecipeCard } from '@/src/components/RecipeCard';
import { useRecipesStore } from '@/src/store/recipes.store';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import Link from 'next/link';

export default function Home() {
	const { recipes, loading, error, fetchRecipes } = useRecipesStore();

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	if (loading) {
		return <div className="container mx-auto p-4">Loading</div>;
	}

	if (error) {
		return <div className="container mx-auto p-4">Loading error: {error}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Recipes</h1>
			<div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
				{recipes.map((recipe: IRecipe) => (
					<Link
						key={recipe.id}
						href={`/recipes/${recipe.id}`}
						className="flex justify-center w-full"
					>
						<RecipeCard recipe={recipe} />
					</Link>
				))}
			</div>
		</div>
	);
}
