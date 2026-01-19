import Link from "next/link"
import type { IRecipe } from "../../../shared/types/recipe.interface"

interface Props {
  recipe: IRecipe
}

export function Recipe({recipe}: Props) {
  return <div>
    <p>{recipe.text}</p>
    <Link href={'/'}>@{recipe.author}</Link>
  </div>
}
