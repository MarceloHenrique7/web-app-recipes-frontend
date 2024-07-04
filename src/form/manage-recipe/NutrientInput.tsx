import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";





type Props = {
  index: number;
}


const NutrientInput = ({ index }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2 space-y-2 flex flex-col items-center gap-2 rounded p-5 shadow-[0px_0px_22px_4px_rgba(0,0,0,0.1)]">
        <FormField
        control={control}
        name={`nutrients.${index}.calories`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel>
                  Calories <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={`0`}/>
              </FormControl>
          </FormItem>
        )}
        />
        <FormField
        control={control}
        name={`nutrients.${index}.fat`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel>
                  Fat <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={`0`}/>
              </FormControl>
          </FormItem>
        )}
        />
        <FormField
        control={control}
        name={`nutrients.${index}.protein`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel>
                  Protein <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={`0`}/>
              </FormControl>
          </FormItem>
        )}
        />
        <FormField
        control={control}
        name={`nutrients.${index}.carbohydrate`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel>
                  Carbohydrate <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={`0`}/>
              </FormControl>
          </FormItem>
        )}
        />
    </div>
  )
}

export default NutrientInput;