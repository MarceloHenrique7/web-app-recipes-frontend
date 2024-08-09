import { Recipe } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteMyRecipe } from "@/api/MyRecipeApi";


type Props = {
    recipe: Recipe
    isHomePage: boolean;
    isForSale: boolean;
}


const CardMySavedRecipes = ({recipe, isForSale}: Props) => {


  const { isLoading } = useDeleteMyRecipe()

  if (isLoading) {
    return "Loading"
  }


  return (
    <Card key={recipe.id} className="h-full w-full flex flex-col justify-between">
        <AspectRatio ratio={16/6}>
          <img src={recipe.imageUrl} className="rounded w-full h-full object-cover"/>
        </AspectRatio>
      <CardHeader>
        <CardTitle className="font-bold flex items-start flex-wrap flex-1 justify-between text-2xl">
            <h1>
              {recipe.name.length >= 20 ? (
                    recipe.name.substring(0, 20)  + '...'
                ) : (
                    recipe.name
                )
                }
            </h1>
            <span >
              {isForSale ? (
                <span>
                    ${recipe.price.toFixed(2).replace('.', ',')}
                </span>
              ):(
                <span className="text-green-300">
                    Free
                </span>
              )}
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-wrap flex-1 justify-between gap-5">
        <div className="flex gap-3 flex-row flex-wrap">
          {recipe.categories.length <= 0 && <span>Don't have a category</span>}
          {recipe.categories.map((item, index) => (
          <Link to={`/search/recipe/category/${item}`} className="hover:underline hover:opacity-80">
            <span key={index} className="flex">
              <span>{item}</span>
              {index < recipe.categories.length - 1 && <Dot />}
            </span>
            </Link>
          ))}
        </div>
        <div className="font-bold flex flex-col gap-2 ">
          <h1>Description:</h1> 
          <span className="text-gray-400">{recipe.description}</span>
        </div>
        <CardDescription className="flex flex-wrap gap-4 justify-between">
          <span className="font-bold">Cook Time: {recipe.cookTime}</span>
          <span className="font-bold">Prep Time: {recipe.prepTime}</span>
          <span className="font-bold">Serving: {recipe.serving}</span>
        </CardDescription>
      </CardContent>
      
        
          <div className="flex justify-start gap-5 m-5">
            <Link to={`/details/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 transition-all flex items-center justify-center rounded font-bold flex-1 p-2 text-white">See More</Link>
          </div>
        
      
  </Card>


  )
}

export default CardMySavedRecipes