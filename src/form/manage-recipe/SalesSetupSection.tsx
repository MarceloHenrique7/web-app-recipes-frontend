import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import SalesSetupCheckBox from "./SalesSetupCheckBox";

const SalesSetupSection = () => {

    const { control } = useFormContext()

    const [forSale, setForSale] = useState(true)

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
                Sales Options 
            </h1>
            <FormField 
                control={control}
                name="forSale"
                render={({field}) => (
                    <SalesSetupCheckBox onChangeForSale={(value) => setForSale(value)} field={field}/>
                )}
            />
            {
            forSale === true && (
            <FormField 
                control={control}
                name="price"
                render={({field}) => (
                <FormItem className="flex flex-col gap-3 justify-start mt-2">
                    <FormLabel className="text-sm">
                        Define the price
                        <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field}/>
                    </FormControl>
                </FormItem>
            )}
            />
                )
            }
        </div>
    )
}

export default SalesSetupSection;