'use client';


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Flame } from 'lucide-react';
import type { IRecipe } from '../shared/types/recipe.interface';

interface RecipeCardProps {
  recipe: IRecipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow pt-0 w-4/5 sm:w-full">
      <CardHeader className="p-0">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{recipe.name}</CardTitle>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {recipe.prepTimeMinutes}m prep • {recipe.cookTimeMinutes}m cook
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Serves {recipe.servings}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <span>{recipe.caloriesPerServing} kcal/serving</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Badge variant="outline">{recipe.difficulty}</Badge>
        <Badge variant="outline">{recipe.cuisine}</Badge>
      </CardFooter>
    </Card>
  );
}