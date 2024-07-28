

import { useGetMyRecipe } from "@/api/MyRecipeApi";
import RecipeInfo from "@/components/RecipeInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";



const DetailsRecipe = () => {
    const { recipe, isLoading } = useGetMyRecipe();
    if (!recipe) {
        return "No Recipes Found"
    }


    if(isLoading) {
        return "Loading..."
    }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16/9}>
        <img src={recipe.imageUrl} className="rounded object-cover h-full w-full"/>
      </AspectRatio>
      <div>
        
        <RecipeInfo recipe={recipe} isForSale={recipe.forSale}/>
      </div>
    </div>
  )
}

export default DetailsRecipe;