import {useCreateMyRecipe } from "@/api/MyRecipeApi";
import ManageRecipeForm from "@/form/manage-recipe/ManageRecipeForm";

const ManageRecipePage = () => {
    const { createRecipe, isLoading } = useCreateMyRecipe();
    
    return (
    <div>
        <ManageRecipeForm btnText={"Submit"} onSave={createRecipe} isLoading={isLoading}/>

    </div>
  )
}

export default ManageRecipePage;