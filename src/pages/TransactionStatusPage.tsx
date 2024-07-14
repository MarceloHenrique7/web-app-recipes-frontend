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
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex flex-col items-center text-gray-900">

                <CardTitle className="flex flex-col text-emerald-700 gap-2 text-2xl items-center">
                    <span className="font-bold  tracking-widest">SUCCESS</span>
                    <span className="font-bold">ENJOY YOUR RECIPE!</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
            
                <div className="flex flex-col justify-between items-center p-5 rounded-lg gap-5 bg-gray-100">
                    
                    <AspectRatio ratio={16/6}>
                        <img src={recipe.imageUrl} className="rounded object-cover w-full h-full"/>
                    </AspectRatio>
                    <div>
                        <h1 className="font-bold text-xl">{recipe.name}</h1>
                    </div>
                </div>
                <CardDescription className="flex items-center justify-between">
                        <h1 className="bg-emerald-600 text-white text-center transition duration-300 ease-in-out hover:bg-emerald-900 hover:text-white p-3 rounded-md underline text-blue-500 font-bold cursor-pointer">
                            More details
                        </h1>
                        <Link to={"/"} className="flex items-center transition duration-300 ease-in-out hover:bg-gray-200 gap-2 p-3 rounded-md">
                            <ArrowLeft size={15}/> Back
                        </Link>
                </CardDescription>
            </CardContent>
            <CardFooter>

            </CardFooter>
            
        </Card>
    )

}

export default TransactionStatusPage;