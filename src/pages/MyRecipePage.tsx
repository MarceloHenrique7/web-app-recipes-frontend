import { useGetAllMyRecipe, useGetAllRecipes } from "@/api/MyRecipeApi";
import { useGetMyTransaction } from "@/api/MyTransactionApi";
import CardMyRecipe from "@/components/CardMyRecipe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const MyRecipePage = () => {

    const { recipes , isLoading } = useGetAllMyRecipe();
    const { transactions, isLoading: transactionIsLoading } = useGetMyTransaction()
    const { recipes: globalRecipes, isLoading: isLoadingGlobal } = useGetAllRecipes()
    const [transactionsIds, setTransactionsIds] = useState<Array<string>>([]);

    useEffect(() => {
      const ids = transactions?.map(transaction => transaction.recipeId) || [];
      setTransactionsIds(ids);
    }, [transactions]);

    if (isLoading || transactionIsLoading || isLoadingGlobal) {
      return "Loading..."
    }

    if (!recipes || recipes.length === 0 ) {
      return <div className="flex flex-col gap-5 items-center justify-center">
        <h1>You haven't recipe</h1>
        <Link className="flex bg-emerald-700 hover:bg-emerald-900 text-white font-bold shadow-lg p-3 rounded" to={"/create-recipe"}>
            Create your recipe now
        </Link>
      </div>
    }

    if (!recipes || !Array.isArray(recipes)) {
      return (
        <Stack className="flex flex-col items-center justify-center" sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      )
    }

    const recipesPurchased = globalRecipes?.filter((recipe) => transactionsIds.includes(recipe.id))

  return (
    <Tabs defaultValue="my-recipes">
        <div className="flex flex-col gap-10 justify-around">
          <div className="flex justify-between gap-2 items-center">
            <div>
              <h1 className="font-bold text-3xl">Your <span>Recipes</span></h1>
              <p className="font-bold text-sm text-sm text-gray-400"><span>See Your Recipes And Manage</span></p>
            </div>
            <div>
              <Link to={"/create-recipe"} className="flex bg-emerald-700 hover:bg-emerald-900 text-white font-bold shadow-lg p-2 rounded">Create recipe</Link>
            </div>
          </div>
        </div>
      <TabsList>
          <TabsTrigger value="my-recipes">
              My Recipes
          </TabsTrigger>
          <TabsTrigger value="recipes-purchase">
              Recipes Purchase
          </TabsTrigger>
      </TabsList>
      <TabsContent value="my-recipes">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 h-full gap-10 self-center">
            {recipes?.map((recipe) => (
              <CardMyRecipe isRecipePurchase={false} isForSale isHomePage={false} recipe={recipe}/>
            ))}
        </div>
      </TabsContent>
      <TabsContent value="recipes-purchase">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 h-full gap-10 self-center">
            {recipesPurchased?.map((recipe) => (
              <CardMyRecipe isRecipePurchase={true} isForSale={true} isHomePage={false} recipe={recipe}/>
            ))}
        </div>
      </TabsContent>
      <TabsContent value="recipes-purchase">

      </TabsContent>

    </Tabs>

  )
}

export default MyRecipePage;