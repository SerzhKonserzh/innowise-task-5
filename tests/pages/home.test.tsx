import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '../../src/app/(private)/(home)/page'
import { useRecipesStore } from '../../src/store/recipes.store'

vi.mock('../../src/store/recipes.store', () => ({
  useRecipesStore: vi.fn()
}))

vi.mock('../../src/components/RecipeCard', () => ({
  RecipeCard: () => <div data-testid="recipe-card">Recipe Card</div>
}))

vi.mock('../../src/components/FilterBar', () => ({
  FilterBar: () => <div>Filter Bar</div>
}))

vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('HomePage', () => {
  it('renders home page with loading state', () => {
    ;(useRecipesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      recipes: [],
      loading: true,
      error: null,
      hasMore: false,
      fetchRecipes: vi.fn(),
      resetRecipes: vi.fn()
    })

    render(<Home />)
    
    expect(screen.getByText('Recipes')).toBeInTheDocument()
  })
  
  it('matches snapshot for loading state', () => {
    ;(useRecipesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      recipes: [],
      loading: true,
      error: null,
      hasMore: false,
      fetchRecipes: vi.fn(),
      resetRecipes: vi.fn()
    })

    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
  })
})