import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { categoriesList } from "@/config/recipe-categories-config"
import CategoryCheckbox from "./CategoryCheckbox"


const CategorySection = () => {

    const { control } = useFormContext();

  return (
    <div className="space-y-2">
        <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <FormDescription>
            Enter the categories to your recipe
        </FormDescription>
        </div>
        <FormField 
        control={control}
        name="categories"
        render={({ field }) => (
            <FormItem>
                <div className="grid md:grid-cols-5 gap-1">
                    {categoriesList.map((category, index) => (
                        <CategoryCheckbox key={index} category={category} field={field}/>
                    ))}                  
                </div>
                <FormMessage />
            </FormItem>
        )}
        
        />
    </div>
  )
}

export default CategorySection;