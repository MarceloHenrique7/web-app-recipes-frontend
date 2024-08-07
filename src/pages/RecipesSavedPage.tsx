import { useGetAllRecipes } from "@/api/MyRecipeApi";
import { useGetMyUser } from "@/api/MyUserApi";
import CardMySavedRecipes from "@/components/CardMySavedRecipes";

const RecipesSaved = () => {


    const { recipes, isLoading: isLoadingRecipe } = useGetAllRecipes()
    const { currentUser, isLoading: isLoadingUser } = useGetMyUser()


    if (isLoadingRecipe || isLoadingUser) {
        return "Loading..."
    }
    
    const savedRecipes = recipes?.filter((recipe) => currentUser?.savedRecipes.includes(recipe.id))

    console.log(savedRecipes)

    return (
        <div>
            {savedRecipes?.length === 0 ? (
                <div>
                    <h2 className="font-bold">
                        You don't have any saved recipes
                    </h2>
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="self-start max-w-72">
                        <p className="font-bold text-2xl">Saved Recipes</p>
                        <p className="font-bold text-sm text-gray-800">You saved these recipes recently.</p>
                    </div>
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {savedRecipes?.map((recipe) => (
                            <CardMySavedRecipes recipe={recipe} isForSale={recipe.forSale} isHomePage={false}/>
                        ))
                        }
                    </div>
                </div>
            )
        }
        </div>

    )

}


export default RecipesSaved;