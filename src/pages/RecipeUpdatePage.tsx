import { useGetMyRecipe, useUpdateMyRecipe } from "@/api/MyRecipeApi";
import ManageRecipeForm from "@/form/manage-recipe/ManageRecipeForm";

const ManageRecipePage = () => {
    const { updateRecipe, isLoading } = useUpdateMyRecipe();
    
    const { recipe } = useGetMyRecipe()

    if (!recipe) {
      return "Loading..."
    }

    return (
    <div>
        <ManageRecipeForm btnText={"Update"} recipe={recipe} onSave={updateRecipe} isLoading={isLoading}/>

    </div>
  )
}

export default ManageRecipePage;