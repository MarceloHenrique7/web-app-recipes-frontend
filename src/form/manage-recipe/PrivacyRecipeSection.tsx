import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormControl } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

const OPTIONS_PRIVACY = [
    {
        label: "Public",
        value: true
    },
    {
        label: "Private",
        value: false
    }
]

type Option = {
    label: string;
    value: boolean
}

const PrivacyRecipeSection = () => {

    const {control} = useFormContext()

    const [label, setLabel] = useState('Public');

    const handleOnChangeLabel = (newValue: Option) => {
        setLabel(newValue.label)
    }

    const onChangeEvent = ( field: any) => {
        console.log(field)
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
                Privacy Options 
            </h1>
            <div className="rounded flex flex-col md:flex-row items-center justify-between gap-5 bg-gray-200 py-10 px-5">
                <FormLabel className="font-bold text-xl">
                    Change the privacy of Recipe
                </FormLabel>

                <FormField 
                    control={control}
                    name="isPublic"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={(value) => {
                                    const getValue = OPTIONS_PRIVACY.find((item) => item.label == value)
                                    field.onChange(getValue?.value);
                                }}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={label} className="theme"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {OPTIONS_PRIVACY.map((item) => (
                                            <SelectItem  {...field} onChange={() => {
                                                field.value = item.value
                                                console.log(field.value)
                                            }} value={item.label}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}


export default PrivacyRecipeSection;