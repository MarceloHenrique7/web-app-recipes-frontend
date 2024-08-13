import { Recipe, TransactionType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {  ArrowRight, Dot, ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useCreateCheckoutSession, useGetMyTransaction } from "@/api/MyTransactionApi";
import { useGetMyUser } from "@/api/MyUserApi";
import LoadingButton from "./LoadingButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateNotification, useDeleteNotification } from "@/api/NotificationApi";
import { useEffect, useState } from "react";
import DetailsRecipeComponent from "./DetailsRecipeComponent";
import { Separator } from "./ui/separator";


type Props = {
    recipe: Recipe;
    isForSale: boolean;
}

const RecipeInfo = ({ recipe, isForSale }: Props) => {
    
    const { createCheckoutSession, isLoading: isLoadingCheckout } = useCreateCheckoutSession()
    const { currentUser, isLoading: isLoadingUser } = useGetMyUser()
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const { createNotification } = useCreateNotification()
    const { deleteNotification } = useDeleteNotification()
    const { transactions, isLoading: transactionIsLoading } = useGetMyTransaction()

    if (transactionIsLoading) {
        "Loading"
    }


    const recipeIsPurchased = transactions?.some((transaction) => transaction.recipeId === recipe.id)
    const recipeIsMine = recipe.userId === currentUser?.id
    const [messageSaveChange, setMessageSaveChange] = useState('SAVE')


    useEffect(() => {
        const checkIfSaved = async () => {
          if (isAuthenticated && currentUser && recipe) {
            const exists = currentUser.savedRecipes.includes(recipe.id);
            if (exists) {
              setMessageSaveChange("UNSAVE");
            }
          }
        };
        checkIfSaved();
  }, [isAuthenticated, currentUser, recipe]);

    const onLogin = async () => {
        // quando usuário clicar no botão vai vim para essa função
        
        await loginWithRedirect({
            //aqui chamamos o metodo de loginWithRedirect
            appState: {
                // quando usuário fizer login ele vai ser retornado para a url que foi salva antes do clique no botão
                returnTo: pathname
            }
        })
    }
    

    const onCheckout = async () => {

        const checkoutData = {
            transactionType: TransactionType.PURCHASE,
            currency: "usd",
            method: "card",
            amount: recipe.price,
            userId: user._id,
            recipeId: recipe.id,
        }


        const data = await createCheckoutSession(checkoutData)

        window.location.href = await data.url
    }



    let user: any;

    if ( isAuthenticated ) {
        if (!currentUser) {
            return "Unable to get user"
        }
    
        if (isLoadingUser) {
            return "Loading..."
        }
        user = currentUser
    
    }

    if(!recipe) {
        return "Unable to get recipe"
    }

    const handleWithSaveOnClick = async ( recipeId: string, userId: string ) => {
        const data = {
            title: `${currentUser?.name} saved your recipe!`,
            subtitle: '',
            description: '',
            recipientUserId: recipe.userId,
            recipeId: recipe.id,
            type: "SAVE",
            userId: currentUser?.id as string,
            isGeneral: false,
            isRead: false,
            readByUsers: [],
        }


        if(messageSaveChange === 'SAVE') {
            await createNotification(data)

            setMessageSaveChange('UNSAVE')
        } else {
            await deleteNotification({recipeId, userId})

            setMessageSaveChange('SAVE')
        }

        

    }

  return (
    <Card className="flex items-center flex-col p-2">
        <CardHeader className="flex gap-5 w-full">
            <CardTitle className="font-bold flex flex-wrap justify-between text-xl">
            <h1 className="flex flex-wrap">{recipe.name}</h1>
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
        <CardContent className="flex flex-col w-full gap-12 md:gap-20">
            <div className="flex flex-wrap">
                {recipe.categories?.map((item, index) => (
                    <Link to={`/search/recipe/category/${item}`} className="hover:underline hover:opacity-80">
                        <span key={index} className="flex flex-wrap">
                            <span className="text-gray-600 font-bold">{item}</span>
                            {index < recipe.categories.length - 1 && <Dot className="text-gray-600"/>}
                        </span>
                    </Link>

                ))}
            </div>
            <Separator/>
            <div className="flex flex-col gap-10 p-5">
                <h1 className="text-gray-900 md:text-center text-3xl font-bold">Utils</h1>
                <div className="w-full font-bold text-sm grid grid-cols-1 md:grid-cols-3 gap-5">
                    <span className="md:text-left">Prep Time: {recipe.prepTime} Min</span>
                    <span className="md:text-center">Cook Time: {recipe.cookTime} Min</span>
                    <span className="md:text-right">Serving: {recipe.serving} Min</span>
                </div>
            </div>

            
            {
            isForSale ? (
                !recipeIsPurchased && !recipeIsMine ?  (
                    <div>
                        <h1 className="font-bold bg-gray-800 rounded-full p-3 text-center text-white">
                            Buy this recipe for more details.
                        </h1>
                    </div>
                ) : (
                    <DetailsRecipeComponent recipe={recipe}/>
                )
            ) : (
                <DetailsRecipeComponent recipe={recipe}/>
            )
            
        }

            {
                isAuthenticated ? (
                    isForSale ? (
                        <CardFooter className="gap-2 mt-20">  
                            <span className=" flex flex-wrap gap-2">
                                <span className="flex cursor-pointer gap-2 bg-emerald-600 p-2 rounded-md text-white font-bold hover:bg-emerald-900" onClick={() => handleWithSaveOnClick(recipe.id, currentUser?.id as string)}><i className={`bi bi-lg ${messageSaveChange === 'SAVE' ? 'bi-bookmark' : 'bi-bookmark-fill'}`} ></i>{messageSaveChange}</span>
                                <Dialog>
                                    <DialogTrigger>
                                        <span className="flex cursor-pointer gap-2 bg-emerald-600 p-2 rounded-md text-white font-bold hover:bg-emerald-900"><ShoppingCart />Buy Recipe</span>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[350px] rounded-md">
                                        <DialogTitle className="font-bold text-2xl mb-8">
                                            Choose the form of payment
                                        </DialogTitle>
                                        <DialogDescription className="flex flex-col gap-2">
                                            <Link className="font-bold flex justify-between items-center bg-emerald-900 p-2 rounded-lg text-white" to={`/checkout/wallet/${recipe.id}`}>
                                                <span>Continue with Wallet</span> <span><ArrowRight /></span>
                                            </Link>
                                            { isLoadingCheckout ? <LoadingButton/> : <Button onClick={onCheckout} className="font-bold flex justify-between items-center bg-emerald-900 hover:bg-emerald-900 p-2 rounded-lg text-white" >
                                                <span>Continue with Credit Card</span> <span><ArrowRight /></span>
                                            </Button> }
                                        </DialogDescription>
                                    </DialogContent>
                                </Dialog>
                            </span>
                        </CardFooter>
                    ) : (
                        <span className="flex cursor-pointer gap-2 bg-emerald-900 p-2 rounded-md text-white self-start font-bold hover:bg-emerald-700 transition-all ease-in-out" onClick={() => handleWithSaveOnClick(recipe.id, currentUser?.id as string)}><i className={`${messageSaveChange === 'SAVE' ? 'bi-bookmark' : 'bi-bookmark-fill'}`}></i>{messageSaveChange}</span>
                    )
                ) : (
                    <Button className="self-start bg-emerald-900 font-bold hover:bg-emerald-700 transition-all ease-in-out" onClick={onLogin}>Make Log In now</Button>
                )
                
            }
            
        </CardContent>
    </Card>
  )
}

export default RecipeInfo;