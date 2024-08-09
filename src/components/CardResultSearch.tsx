import { Recipe } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import { Link } from "react-router-dom"
import { Beef, ChefHat, Clock1, Dot } from "lucide-react"


type Props = {
    recipe: Recipe
    isForSale: boolean;
}

const CardResultSearch = ({ recipe, isForSale }: Props) => {


  return (
    <Link to={`/details/${recipe.id}`}>
    
        <Card className="h-full w-full flex flex-col justify-between">
            <AspectRatio ratio={16/6}>
                <img src={recipe.imageUrl} className="rounded object-cover w-full h-full"/>
            </AspectRatio>
            <CardHeader className="flex flex-1">
                <CardTitle className="flex flex-wrap justify-between">
                    {recipe.name}
                    <span>
                        {isForSale && (
                        `$ ${recipe.price.toFixed(2).replace('.', ',')}`
                        )}
                    </span>
                </CardTitle>
                <CardDescription>
                    {recipe.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col  gap-5">
                <div className="flex flex-row flex-wrap flex-1 ">
                    {
                    recipe.categories?.length === 0 ? (
                        <span>No Category</span>
                    ) :
                    (recipe.categories?.slice(0, 7).map((category, index) => (
                        <Link to={`/search/recipe/category/${category}`} className="hover:underline hover:opacity-80">
                            <span className="flex">
                                <span>
                                    {category}
                                </span>
                                {index < recipe.categories.length - 1 ? <Dot/>: ""}
                            </span>
                        </Link>
                    )))}
                </div>
                <div className="flex font-bold flex-wrap text-emerald-800 justify-between">
                    <span className="flex items-center "><Clock1 />: {recipe.prepTime} min</span>
                    <span className="flex items-center"><ChefHat />: {recipe.cookTime} min</span>
                    <span className="flex items-center"><Beef />: {recipe.serving}</span>
                </div>
            </CardContent>
        </Card>
    </Link>
  )
}

export default CardResultSearch