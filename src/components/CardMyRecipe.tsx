import { Recipe } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Dot, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useDeleteMyRecipe } from "@/api/MyRecipeApi";


type Props = {
    recipe: Recipe
    isHomePage: boolean;
    isForSale: boolean;
}


const CardMyRecipes = ({recipe, isHomePage, isForSale}: Props) => {


  const { deleteRecipe, isLoading } = useDeleteMyRecipe()

  if (isLoading) {
    return "Loading"
  }

  const handleClickDeleteRecipe = async () => {

    await deleteRecipe(recipe.id)

  }

  return (
    <Card key={recipe.id} className="h-full w-full flex flex-col justify-between">
        <AspectRatio ratio={16/6}>
          <img src={recipe.imageUrl} className="rounded w-full h-full object-cover"/>
        </AspectRatio>
      <CardHeader>
        <CardTitle className="font-bold flex flex-wrap justify-between text-2xl">
            <h1>
              {recipe.name.length >= 20 ? (
                recipe.name.substring(0, 20)  + '...'
              ) : (
                recipe.name
              )
            }
            </h1>
            <span>
              {isForSale && (
                `$ ${recipe.price.toFixed(2).replace('.', ',')}`
              )}
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 flex-wrap flex-1 justify-between">
        <div className="flex gap-3 flex-row flex-wrap">
          {recipe.categories.length <= 0 && <span>Don't have a category</span>}
          {recipe.categories.map((item, index) => (
            <span key={index} className="flex">
              <span>{item}</span>
              {index < recipe.categories.length - 1 && <Dot />}
            </span>
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
      
        
        {!isHomePage ? (
          <div className="flex items-center justify-start gap-5 m-5">
            <Link to={`/details/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 flex items-center justify-center rounded font-bold flex-1 p-2 text-white">Details</Link>
            <Link to={`/update/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 p-2 rounded text-white"><Pencil /> </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-700 hover:bg-red-900 h-full p-2 rounded text-white">
                  <Trash2/>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md gap-10">
                <DialogHeader>
                  <DialogTitle>
                  Are you sure you want to delete this recipe?                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-end">
                  <Label>
                    <Button onClick={handleClickDeleteRecipe}>
                      Delete recipe
                    </Button>
                  </Label>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        ) : (
          <div className="flex justify-start gap-5 m-5">
            <Link to={`/details/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 transition-all flex items-center justify-center rounded font-bold flex-1 p-2 text-white">{recipe.forSale  ? 'See More (Buy Now)': 'See More'}</Link>
          </div>
        )
      }
  </Card>


  )
}

export default CardMyRecipes