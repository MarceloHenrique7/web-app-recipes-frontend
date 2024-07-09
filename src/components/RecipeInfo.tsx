import { Recipe, TransactionType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {  ArrowRight, Dot, ShoppingCart, Star } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCreateCheckoutSession } from "@/api/MyTransactionApi";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
    recipe: Recipe;
    isForSale: boolean;
}

const RecipeInfo = ({ recipe, isForSale }: Props) => {

    const { createCheckoutSession, isLoading: isLoadingCheckout } = useCreateCheckoutSession()

    const { currentUser, isLoading: isLoadingUser } = useGetMyUser()

    if (!currentUser) {
        return "Unable to get user"
    }

    if (isLoadingUser) {
        return "Loading..."
    }

    if(!recipe) {
        return "Unable to get recipe"
    }


    const onCheckout = async () => {

        const checkoutData = {
            transactionType: TransactionType.PURCHASE,
            currency: "usd",
            method: "card",
            amount: recipe.price,
            userId: currentUser._id,
            recipeId: recipe.id,
        }


        const data = await createCheckoutSession(checkoutData)

        window.location.href = await data.url
    }


  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-bold flex flex-wrap justify-between text-4xl">
            <h1>{recipe.name}</h1>
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
                    <span className="flex cursor-pointer gap-2 bg-emerald-600 p-2 rounded-md text-white font-bold hover:bg-emerald-900"><Star/>Save</span>
                    <Dialog>
                        <DialogTrigger>
                            <span className="flex cursor-pointer gap-2 bg-emerald-600 p-2 rounded-md text-white font-bold hover:bg-emerald-900"><ShoppingCart />Buy this Recipe</span>
                        </DialogTrigger>
                        <DialogContent className="max-w-[350px] rounded-md">
                            <DialogTitle className="font-bold text-2xl mb-8">
                                Choose the form of payment
                            </DialogTitle>
                            <DialogDescription className="flex flex-col gap-2">
                                <Link className="font-bold flex justify-between items-center bg-emerald-900 p-2 rounded-lg text-white" to={`/checkout/wallet/${recipe.id}`}>
                                    <span>Continue with Wallet</span> <span><ArrowRight /></span>
                                </Link>
                                <Button onClick={onCheckout} className="font-bold flex justify-between items-center bg-emerald-900 hover:bg-emerald-900 p-2 rounded-lg text-white" >
                                    <span>Continue with Credit Card</span> <span><ArrowRight /></span>
                                </Button>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                </span>
            </CardFooter>
        </CardContent>
    </Card>
  )
}

export default RecipeInfo;