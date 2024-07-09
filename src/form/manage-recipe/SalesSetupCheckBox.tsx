import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";



type Props = {
    onChangeForSale: (value: boolean) => void;
    field: ControllerRenderProps<FieldValues, "forSale">;
}

const SalesSetupCheckBox = ({onChangeForSale, field}: Props) => {
    return (

        <FormItem className="flex items-center flex-row space-x-1 space-y-0 mt-2">
        <FormControl>
            <Checkbox
                className="bg-white"
                checked={field.value === true}
                onCheckedChange={(checked) => {
                    if(checked) {
                        field.onChange(field.value = true)
                        onChangeForSale(true)
                        console.log(field.value)
                    } else {
                        field.onChange(field.value = false)
                        onChangeForSale(false)
                        console.log(field.value)
                    }
                }}
            />
        </FormControl>
        <FormLabel className="font-bold text-lg">
            Sell this Recipe?
        </FormLabel>
    </FormItem>

    )


}



export default SalesSetupCheckBox;





