import { Recipe } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Beef, ChefHat, Clock1, Dot, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useDeleteMyRecipe } from "@/api/MyRecipeApi";

type Props = {
    recipe: Recipe;
    isHomePage: boolean;
    isForSale: boolean;
    isRecipePurchase: boolean;
};

const CardMyRecipes = ({ recipe, isHomePage, isForSale, isRecipePurchase }: Props) => {
    const { deleteRecipe, isLoading } = useDeleteMyRecipe();

    const handleClickDeleteRecipe = async () => {
        await deleteRecipe(recipe.id);
    };

    if (isLoading) return "Loading";

    return (
        <Card key={recipe.id} className="h-full w-full flex flex-col justify-between">
            <AspectRatio ratio={16 / 6}>
                <img src={recipe.imageUrl}
                 alt={recipe.name}
                    className="rounded w-full h-full object-cover"
                    width="1600" 
                    height="600" 
                    loading="lazy" />
            </AspectRatio>
            <CardHeader className="flex flex-1">
                <CardTitle className="flex flex-wrap justify-between">
                    <h1>{recipe.name.length > 20 ? `${recipe.name.substring(0, 20)}...` : recipe.name}</h1>
                    {isForSale && <span>{`$ ${recipe.price.toFixed(2).replace('.', ',')}`}</span>}
                </CardTitle>
                <CardDescription>
                    <p className="text-sm opacity-80">
                        {recipe.description.length > 30 ? `${recipe.description.substring(0, 30)}...` : recipe.description}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-5 flex-1">
                <div className="flex gap-3 flex-wrap">
                    {recipe.categories.length === 0 && <span>Don't have a category</span>}
                    {recipe.categories.slice(0, 7).map((item, index) => (
                        <Link key={index} to={`/search/recipe/category/${item}`} className="hover:underline hover:opacity-80">
                            <span className="flex">
                                <span className="text-gray-600 opacity-80">{item}</span>
                                {index < recipe.categories.length - 1 && <Dot />}
                            </span>
                        </Link>
                    ))}
                </div>
                <CardDescription className="flex flex-1 font-bold text-emerald-800 justify-between">
                    <span className="flex items-center"><Clock1 />: {recipe.prepTime} min</span>
                    <span className="flex items-center"><ChefHat />: {recipe.cookTime} min</span>
                    <span className="flex items-center"><Beef />: {recipe.serving}</span>
                </CardDescription>
            </CardContent>
            <div className="flex items-center gap-5 m-5">
                <Link to={`/details/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 transition-all flex items-center justify-center rounded font-bold flex-1 p-2 text-white">
                    {isHomePage ? (recipe.forSale ? 'Details (Buy Now)' : 'Details') : 'Details'}
                </Link>
                {!isHomePage && !isRecipePurchase && (
                    <>
                        <Link to={`/update/${recipe.id}`} className="bg-emerald-700 hover:bg-emerald-900 p-2 rounded text-white">
                            <Pencil />
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-red-700 hover:bg-red-900 h-full p-2 rounded text-white">
                                    <Trash2 />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md gap-10">
                                <DialogHeader>
                                    <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-end">
                                    <Button onClick={handleClickDeleteRecipe}>Delete recipe</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>
        </Card>
    );
};

export default CardMyRecipes;
