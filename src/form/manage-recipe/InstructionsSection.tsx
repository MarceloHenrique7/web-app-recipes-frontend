import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import InstructionInput from "./InstructionInput";
import { Button } from "@/components/ui/button";

const InstructionsSection = () => {

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "instructions"
  });

  return (
    <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Instructions</h1>
          <FormDescription>
             Enter instructions of your recipe
          </FormDescription>
        </div>
        <FormField
        control={control}
        name="instructions"
        render={()=>(
          <FormItem>
              {fields.map((_, index) => (
                <InstructionInput key={index} index={index} removeInstruction={remove}/>
              ))}
          </FormItem>
        )}
        />
        <Button className="bg-emerald-900 hover:bg-emerald-700" type="button" onClick={() => append({ title: "", subtitle: "", description: "" })}>
          Add Instruction
        </Button>

        
    </div>
  )
}

export default InstructionsSection;