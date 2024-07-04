import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
    removeMenuItem: () => void;
}


const IngredientInput = ({ index, removeMenuItem }: Props) => {

    const { control } = useFormContext();

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row rounded p-5 shadow-[0px_0px_22px_4px_rgba(0,0,0,0.1)]">
        <FormField 
        
        control={control}
        name={`ingredients.${index}.name`}
        render={({ field }) => (
            <FormItem className="w-full">
                <FormLabel >
                    Name <FormMessage />
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Banana" />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={control}
        name={`ingredients.${index}.quantity`}
        render={({ field }) => (
            <FormItem className="w-full">
                <FormLabel >
                    Quantity <FormMessage />
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="1" />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={control}
        name={`ingredients.${index}.unit`}
        render={({ field }) => (
            <FormItem className="w-full">
                <FormLabel >
                    Unit <FormMessage />
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="g, kg" />
                </FormControl>
            </FormItem>
        )}
        />
      <Button className="bg-emerald-700 hover:bg-emerald-900 max-h-fit self-end" type="button" onClick={removeMenuItem}>
          <Trash2 />
      </Button>
    </div>
  )
}

export default IngredientInput;