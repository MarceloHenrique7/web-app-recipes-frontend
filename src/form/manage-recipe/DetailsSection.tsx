import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";




const DetailsSection = () => {

    const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-5">
        <div>
            <h1 className="font-bold text-2xl mb-1">Details of your Recipe</h1>
            <FormDescription>
                Enter the details about your recipe
            </FormDescription>
        </div>
        <FormField 
        control={control}
        name="name" 
        render={({ field }) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
            </FormItem>
        )}
        />

        <div className="flex flex-col gap-5">
            <FormField 
            control={control}
            name="description" 
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Your description here" className="bg-white"/>
                    </FormControl>
                </FormItem>
            )}
            />
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField 
                control={control}
                name="prepTime" 
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>PrepTime</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                control={control}
                name="cookTime" 
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>CookTime</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                control={control}
                name="serving" 
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Serving</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}
                />
            </div>
        </div>
    </div>
  )
}

export default DetailsSection;

