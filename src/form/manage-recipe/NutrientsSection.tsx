import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import NutrientInput from "./NutrientInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";




const NutrientsSection = () => {

    const { control } = useFormContext()

    const { fields } = useFieldArray({
        control: control,
        name: "nutrients"
      });

  return (
    <div className="space-y-5">
        <div>
            <h1 className="font-bold text-2xl">Nutrients</h1>
            <FormDescription>
                Enter the nutrients of your recipe
            </FormDescription>
        </div>
        <Card className="bg-amber-200 shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-1 font-bold">
                    <TriangleAlert /> WARNING
                </CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-sm flex items-center justify-center">
                This nutrient information will be analyzed by one of our professionals, it will remain private until it is evaluated.
            </CardContent>
        </Card>
        <FormField 
            name="nutrients"
            control={control}
            render={() => (
                <FormItem>
                    {fields.map((_, index) => (
                        <NutrientInput key={index} index={index}/>
                    ))}
                </FormItem>
            )}
        />

    </div>
  )
}

export default NutrientsSection;