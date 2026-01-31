'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Clock,
	Users,
	Flame,
	Star,
	Timer,
	Utensils,
	ChevronLeft,
	Check
} from 'lucide-react';
import { useRecipesStore } from '@/src/store/recipes.store';
import type { IRecipe } from '@/src/shared/types/recipe.interface';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function RecipeDetailPage() {
	const params = useParams<{ id: string }>();
	const { recipes } = useRecipesStore();
	const [recipe, setRecipe] = useState<IRecipe | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const id = parseInt(params.id);
				if (isNaN(id)) {
					notFound();
					return;
				}

				const storedRecipe = recipes.find(r => r.id === id);
				if (storedRecipe) {
					setRecipe(storedRecipe);
				} else {
					notFound();
					return;
				}
			} catch (error) {
				notFound();
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [params.id, recipes]);

	if (loading) {
		return <div className="container mx-auto p-4">Loading...</div>;
	}

	if (!recipe) {
		return notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="relative h-100">
				<img
					src={recipe.image}
					alt={recipe.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />

				<div className="absolute bottom-0 left-0 right-0 p-6">
					<Button
						variant="ghost"
						size="icon"
						className="mb-4 hover:bg-secondary/50"
					>
						<ChevronLeft className="h-6 w-6" />
					</Button>

					<div className="flex items-center gap-3 mb-4">
						{recipe.tags.map(tag => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>

					<h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>

					<div className="flex items-center gap-6 text-muted-foreground">
						<div className="flex items-center gap-2">
							<Utensils className="h-5 w-5" />
							<span>{recipe.cuisine}</span>
						</div>
						<Button variant="outline" className="">
							<Star className="h-5 w-5" />
							Save to Favorites
						</Button>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-8">
						<Card>
							<CardContent className="p-6">
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div className="text-center">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Clock className="h-5 w-5 text-primary" />
											<span className="font-semibold">
												{recipe.prepTimeMinutes}m
											</span>
										</div>
										<p className="text-sm text-muted-foreground">Prep Time</p>
									</div>

									<div className="text-center">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Timer className="h-5 w-5 text-primary" />
											<span className="font-semibold">
												{recipe.cookTimeMinutes}m
											</span>
										</div>
										<p className="text-sm text-muted-foreground">Cook Time</p>
									</div>

									<div className="text-center">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Users className="h-5 w-5 text-primary" />
											<span className="font-semibold">{recipe.servings}</span>
										</div>
										<p className="text-sm text-muted-foreground">Servings</p>
									</div>

									<div className="text-center">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Flame className="h-5 w-5 text-primary" />
											<span className="font-semibold">
												{recipe.caloriesPerServing}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">Calories</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Separator />

						<div>
							<h2 className="text-2xl font-bold mb-4">About this recipe</h2>
							<p className="text-muted-foreground leading-relaxed">
								This delicious {recipe.name.toLowerCase()} is perfect for{' '}
								{recipe.cuisine} cuisine lovers. With a{' '}
								{recipe.difficulty.toLowerCase()} difficulty level, it's
								suitable for cooks of all skill levels. The combination of fresh
								ingredients and traditional cooking methods creates an
								unforgettable dining experience.
							</p>
						</div>

						<Separator />

						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-2xl font-bold">Ingredients</h2>
								<Badge variant="outline">
									{recipe.ingredients.length} items
								</Badge>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{recipe.ingredients.map((ingredient, index) => (
									<div
										key={index}
										className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
									>
										<Check />

										{ingredient}
									</div>
								))}
							</div>
						</div>

						<Separator />
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-6">Instructions</h2>

						<div className="space-y-6">
							{recipe.instructions.map((instruction, index) => (
								<div
									key={index}
									className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-border"
								>
									<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
										{index + 1}
									</div>
									<p className="text-muted-foreground leading-relaxed">
										{instruction}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
