import { useGetAllRecipes } from "@/api/MyRecipeApi";
import CardMySavedRecipes from "@/components/CardMySavedRecipes";
import CardResultSearch from "@/components/CardResultSearch";
import { useParams } from "react-router-dom";



const PageSearchByCategories = () => {

    const { category } = useParams() 
    const { recipes, isLoading } = useGetAllRecipes()

    if (isLoading) {
        return "Loading"
    }
    if (!recipes) {
        return "NotFound"
    }



    const recipesFilter = recipes?.filter((recipe) => {
        return recipe.categories.some((categoryArr) => categoryArr.toLowerCase() == category?.toLowerCase())
    })


    console.log(recipesFilter)

    return (
        <div className="flex flex-col items-center gap-10">
            <div>
                <h1 className="font-bold text-4xl opacity-80">{category}</h1>
            </div>
            <div className="flex flex-col gap-10">
                {
                    recipesFilter.map((recipe) => (
                        <CardMySavedRecipes isHomePage={false} recipe={recipe} isForSale={true}/>
                    ))
                }
            </div>

        </div>
    )

}



export default PageSearchByCategories;


