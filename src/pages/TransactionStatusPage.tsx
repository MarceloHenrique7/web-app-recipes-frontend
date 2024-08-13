import { useGetMyRecipe } from "@/api/MyRecipeApi";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";




const TransactionStatusPage = () => {

    const { recipe, isLoading } = useGetMyRecipe()

    if (!recipe) {
        return "Recipe not Found"
    }

    if(isLoading) {
        return "Loading..."
    }

    return (
        <div className="flex justify-center">
            <Card className="flex max-w-[600px] flex-col md:flex-row p-5">
                <CardHeader className="flex flex-col items-center justify-between text-gray-900">

                    <CardTitle className="flex flex-col text-emerald-500 font-bold gap-2 text-3xl items-center">
                        <span>ENJOY YOUR RECIPE!</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col w-full h-full gap-6">
                
                    <div className="flex flex-col justify-between p-3 rounded-lg gap-5 bg-gray-50">
                        <AspectRatio ratio={16/6}>
                            <img src={recipe.imageUrl} className="rounded object-cover w-full h-full"/>
                        </AspectRatio>
                        <div>
                            <h1 className="font-bold text-xl text-gray-800">{recipe.name}</h1>
                            <p className="font-bold text-sm text-emerald-800 opacity-80">{recipe.description.substring(0, 20)}...</p>
                        </div>
                        <CardDescription className="flex items-center justify-between">
                            <Link to={`/details/${recipe.id}`} className="bg-emerald-600 text-white text-center transition duration-300 ease-in-out hover:bg-emerald-900 hover:text-white p-2 rounded-md text-blue-500 font-bold cursor-pointer">
                                See Recipe
                            </Link>
                            <Link to={"/"} className="flex items-center transition duration-300 ease-in-out hover:bg-gray-200 gap-2 p-2 rounded-md">
                                <ArrowLeft size={15}/> Explore
                            </Link>
                        </CardDescription>
                    </div>

                </CardContent>
                <CardFooter>

                </CardFooter>
                
            </Card>
        </div>
    )

}

export default TransactionStatusPage;