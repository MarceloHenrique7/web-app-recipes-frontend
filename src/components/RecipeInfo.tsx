import { Recipe } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { Clock } from "lucide-react"
import { useGetMyUser } from "@/api/MyUserApi"

type Props = {
    recipe: Recipe
}

const RecipeInfo = ({ recipe }: Props) => {

    if(!recipe) {
        return "Unable to get recipe"
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-bold text-4xl">
                {recipe.name}
            </CardTitle>
            <CardDescription>
                {recipe.description}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10 w-full">
            <div className="flex flex-wrap">
                {recipe.categories?.map((item, index) => (
                    <span key={index} className="flex flex-wrap">
                        <span className="text-gray-600 font-bold">{item}</span>
                        {index < recipe.categories.length - 1 && <Dot className="text-gray-600"/>}
                    </span>
                ))}
            </div>
            <div className="flex gap-5 flex-wrap justify-around font-bold">
                <span>Prep Time: {recipe.prepTime} Min</span>
                <span>Cook Time: {recipe.cookTime} Min</span>
                <span>Serving: {recipe.serving} Min</span>
            </div>
            <div className="flex flex-col gap-5">
                <span className="text-gray-900 text-3xl font-bold">
                    <h1>Ingredients</h1>
                </span>
                {recipe.ingredients && recipe.ingredients.map((item, index) => (
                    <span key={index} className="flex flex-col gap-2 p-5 rounded bg-gray-100 font-bold ">
                        <span className="text-sm">{index + 1}. {item.name} -  {item.quantity} {item.unit}</span>
                    </span>
                ))}
            </div>
            <div className="flex flex-col gap-10">
                <span className="text-gray-900 text-3xl font-bold">
                    <h1>Instructions</h1>
                </span>
                {recipe.instructions && recipe.instructions.map((item, index) => (
                    <span key={index} className="flex flex-col font-bold gap-2 bg-gray-100 rounded p-5">
                        <span className="text-2xl">{item.title}</span>
                        <span>{item.subtitle}</span>
                        <span className="text-gray-500">{item.description}</span>
                    </span>
                ))}
            </div>
            <div className="flex flex-col items-center gap-5 px-10">
                <span className="text-gray-900 text-3xl font-bold">
                    <h1>Nutrients</h1>
                </span>
                {recipe.nutrients?.map((item, index) => (
                    <div key={index} className="w-full font-bold flex flex-col items-center gap-5 justify-center gap-2">
                        <div className="w-full flex justify-between">
                            <span>Calories: {item.calories}</span>
                            <span>Carbohydrate: {item.carbohydrate}</span>
                        </div>
                        <div className="w-full flex justify-between">
                            <span>Protein: {item.protein}</span>
                            <span>Fat: {item.fat}</span>
                        </div>
                    </div>
                ))}
            </div>
            <CardFooter className="gap-2 mt-20">  
                <span className=" flex flex-wrap gap-2">
                    <span className="flex gap-2 italic"><Clock /> Created to by </span>
                    <span className="font-bold">user</span>
                </span>
            </CardFooter>
        
        </CardContent>
    </Card>
  )
}

export default RecipeInfo;