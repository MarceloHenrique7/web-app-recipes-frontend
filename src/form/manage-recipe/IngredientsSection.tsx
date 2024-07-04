import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import IngredientInput from "./IngredientInput";



const IngredientsSection = () => {

    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    }) 

  return (


    <div className="space-y-5">
        <div>
            <h1 className="text-2xl font-bold">Ingredients</h1>
            <FormDescription>
                Enter the ingredients of your recipe
            </FormDescription>
        </div>
        <FormField 
        control={control}
        name="ingredients"
        render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((_, index) => (
                    <IngredientInput 
                    key={index}
                    index={index}
                    removeMenuItem={() => remove(index)}
                    />
                ))}
            </FormItem>
        )}
        />
        <Button className="bg-emerald-900 hover:bg-emerald-700" type="button" onClick={() => append({name: "", quantity: "", unit: ""})}>
            Add Ingredient
        </Button>
    </div>
  )
}

export default IngredientsSection;