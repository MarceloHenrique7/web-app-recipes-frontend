import { useGetMyRecipe } from "@/api/MyRecipeApi";
import { useCreateMyTransaction } from "@/api/MyTransactionApi";
import { useGetMyUser } from "@/api/MyUserApi";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionType } from "@/types";




const CheckoutWalletPage = () => {

    const { recipe, isLoading: isLoadingRecipe, error: recipeError } = useGetMyRecipe();
    const { currentUser, isLoading: isLoadingUser, error: userError } = useGetMyUser();
    const { createTransaction, isLoading: isLoadingTransaction } = useCreateMyTransaction()

    if (isLoadingUser || isLoadingRecipe) {
        return "Loading...";
    }

    if (userError || recipeError) {
        return "An error occurred while loading data.";
    }

    if (!currentUser) {
        return "No User Found";
    }

    if (!recipe) {
        return "No Recipe Found";
    }

    const onSave = () => {
        createTransaction({
            userId: currentUser.id,
            recipeId: recipe?.id,
            status: "pending",
            method: "wallet",
            amount: recipe?.price,
            currency: "usd",
            transactionType: TransactionType.PURCHASE,
        })
    }


    return (
        <div>
            <Card className="flex flex-col">
                <CardHeader className="space-y-5">
                    <CardTitle className="font-bold text-3xl text-center">
                        Payment with Wallet
                    </CardTitle>
                    <Separator/>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-2xl text-justify">Wallet</h1>
                        <h2 className="text-gray-600 flex flex-col text-lg">
                            <span>Balance </span>
                            <span className="font-bold text-lg">$ {currentUser.wallet?.balance?.toFixed(2)}</span></h2>
                    </div>
                    <Separator/>
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-2xl text-justify">Details of Transaction</h1>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>Recipe name</span>
                            <span className=" text-lg">{recipe?.name}</span>
                        </h2>
                        <Separator/>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>Transaction Type</span>
                            <span className=" text-lg">PURCHASE</span>
                        </h2>
                        <Separator/>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>Currency</span>
                            <span className=" text-lg">Usd</span>
                        </h2>
                        <Separator/>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>Method</span>
                            <span className=" text-lg">Wallet</span>
                        </h2>
                        <Separator/>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>Amount</span>
                            <span className=" text-lg">$ {recipe?.price?.toFixed(2).replace('.', ',')}</span>
                        </h2>
                        <Separator/>
                        <h2 className="text-gray-600 flex flex-wrap justify-between text-lg">
                            <span>buyer's name</span>
                            <span className=" text-lg">{currentUser.name}</span>
                        </h2>
                        <Separator/>
                    </div>

                    { isLoadingTransaction ? <LoadingButton /> : <Button onClick={onSave}>Confirm Transaction</Button> }
                    
                </CardContent>
            </Card>

        </div>
    )

}



export default CheckoutWalletPage;
