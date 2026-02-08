import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RecipeCard } from '../../src/components/RecipeCard'
import type { IRecipe } from '../../src/shared/types/recipe.interface'

vi.mock('../../components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardFooter: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}))

vi.mock('../../components/ui/badge', () => ({
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <div data-variant={variant}>{children}</div>
  ),
}))

describe('RecipeCard', () => {
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
  }

  it('renders recipe card correctly', () => {
    render(<RecipeCard recipe={mockRecipe} />)
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument()
    expect(screen.getByText('Italian')).toBeInTheDocument()
    expect(screen.getByText('Serves 4')).toBeInTheDocument()
  })
  
  it('matches snapshot', () => {
    const { asFragment } = render(<RecipeCard recipe={mockRecipe} />)
    expect(asFragment()).toMatchSnapshot()
  })
})