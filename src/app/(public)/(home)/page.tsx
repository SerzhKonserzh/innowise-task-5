'use client';

import { useEffect, useRef, useCallback } from 'react';
import { RecipeCard } from '@/src/components/RecipeCard';
import { useRecipesStore } from '@/src/store/recipes.store';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import Link from 'next/link';

export default function Home() {
  const { recipes, loading, error, fetchRecipes, hasMore } = useRecipesStore();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRecipeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchRecipes(12, recipes.length);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, recipes.length, fetchRecipes]);

  useEffect(() => {
    fetchRecipes(12, 0);
  }, [fetchRecipes]);

  if (error) {
    return <div className="container mx-auto p-4">Loading error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {recipes.map((recipe: IRecipe, index: number) => (
          <div 
            ref={recipes.length === index + 1 ? lastRecipeElementRef : null} 
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
      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
