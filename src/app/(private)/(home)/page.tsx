'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { RecipeCard } from '@/src/components/RecipeCard';
import { FilterBar } from '@/src/components/FilterBar';
import { useRecipesStore } from '@/src/store/recipes.store';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import Link from 'next/link';

export default function Home() {
  const { recipes, loading, error, fetchRecipes, hasMore, resetRecipes } = useRecipesStore();
  const observer = useRef<IntersectionObserver | null>(null);
  
  const [currentFilters, setCurrentFilters] = useState({
    mealType: '',
    sortBy: 'name',
    order: 'asc' as 'asc' | 'desc'
  });

  const lastRecipeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchRecipes({
          limit: 12,
          skip: recipes.length,
          mealType: currentFilters.mealType || undefined,
          sortBy: currentFilters.sortBy,
          order: currentFilters.order
        });
      }
    }, {
      threshold: 0.1
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, recipes.length, fetchRecipes, currentFilters]);

  const handleFiltersChange = (filters: { 
    mealType: string; 
    sortBy: string; 
    order: 'asc' | 'desc' 
  }) => {
    setCurrentFilters(filters);
    resetRecipes();
    fetchRecipes({
      limit: 12,
      skip: 0,
      mealType: filters.mealType || undefined,
      sortBy: filters.sortBy,
      order: filters.order
    });
  };
  
  useEffect(() => {
    fetchRecipes({
      limit: 12,
      skip: 0,
      mealType: currentFilters.mealType || undefined,
      sortBy: currentFilters.sortBy,
      order: currentFilters.order
    });
  }, [fetchRecipes]);

  if (error) {
    return <div className="container mx-auto p-4">Loading error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <FilterBar onFiltersChange={handleFiltersChange} />
      
      {recipes.length === 0 && loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {recipes.map((recipe: IRecipe, index: number) => (
              <div 
                ref={index === recipes.length - 1 ? lastRecipeElementRef : null} 
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
          
          {loading && hasMore && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}
          
          {!hasMore && recipes.length > 0 && (
            <div className="flex justify-center my-4 text-gray-500">
              No more recipes
            </div>
          )}
        </>
      )}
    </div>
  );
}