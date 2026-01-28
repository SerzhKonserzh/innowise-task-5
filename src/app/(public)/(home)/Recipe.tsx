import Link from 'next/link';
import type { IRecipe } from '../../../shared/types/recipe.interface';
import { PAGES } from '@/src/config/pages.config';

interface Props {
	recipe: IRecipe;
}

export function Recipe({ recipe }: Props) {
	return (
		<div>
			<Link href={PAGES.RECIPE(recipe.id)}>
				<p>{recipe.text}</p>
				<span>@{recipe.author}</span>
			</Link>
		</div>
	);
}
