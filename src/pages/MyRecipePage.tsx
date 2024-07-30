import { useGetAllMyRecipe } from "@/api/MyRecipeApi";
import CardMyRecipe from "@/components/CardMyRecipe";
import { CircularProgress, Stack } from "@mui/material";
import { Link } from "react-router-dom";


const MyRecipePage = () => {

    const { recipes , isLoading } = useGetAllMyRecipe();
    console.log(recipes)

    if (isLoading) {
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

  return (
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 h-full gap-10 self-center">
        {recipes?.map((recipe) => (
          <CardMyRecipe isForSale isHomePage={false} recipe={recipe}/>
        ))}
      </div>

    </div>
  )
}

export default MyRecipePage;