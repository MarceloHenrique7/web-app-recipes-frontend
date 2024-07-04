import { Recipe } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import { Link } from "react-router-dom"
import { Beef, ChefHat, Clock1, Dot } from "lucide-react"


type Props = {
    recipe: Recipe
}

const CardResultSearch = ({ recipe }: Props) => {


  return (
    <Link to={`/details/${recipe.id}`}>
    
        <Card>
            <AspectRatio ratio={16/6}>
                <img src={recipe.imageUrl} className="rounded object-cover w-full h-full"/>
            </AspectRatio>
            <CardHeader>
                <CardTitle>
                    {recipe.name}
                </CardTitle>
                <CardDescription>
                    {recipe.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="flex flex-row flex-wrap">
                    {
                    recipe.categories?.length === 0 ? (
                        <span>No Category Found</span>
                    ) :
                    (recipe.categories?.map((category, index) => (
                        <span className="flex">
                            <span>
                                {category}
                            </span>
                            {index < recipe.categories.length - 1 ? <Dot/>: ""}
                        </span>
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