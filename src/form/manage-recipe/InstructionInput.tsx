import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form"
import { Trash2 } from "lucide-react";

type Props = {
  index: number;
  removeInstruction: () => void; 
}

const InstructionInput = ({ index, removeInstruction }: Props) => {

  const { control } = useFormContext()

  return (
    <div className="space-y-2 flex flex-col items-center gap-2 rounded p-5 shadow-[0px_0px_22px_4px_rgba(0,0,0,0.1)]">
      <FormField 
        control={control}
        name={`instructions.${index}.title`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel >
                Title <FormMessage />
              </FormLabel>
              <FormControl>
                  <Input {...field} placeholder={`Step ${index + 1}`} />
              </FormControl>
          </FormItem>
        )}
      />
      <FormField 
        control={control}
        name={`instructions.${index}.subtitle`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel >
                Subtitle <FormMessage />
              </FormLabel>
              <FormControl>
                  <Input {...field} placeholder="Subtitle of your instruction" />
              </FormControl>
          </FormItem>
        )}
      />
      <FormField 
        control={control}
        name={`instructions.${index}.description`}
        render={({ field }) => (
          <FormItem className="w-full">
              <FormLabel >
                Description <FormMessage />
              </FormLabel>
              <FormControl>
                  <Textarea {...field} placeholder="Description of your instruction" />
              </FormControl>
          </FormItem>
        )}
      />
      <Button className="bg-emerald-700 hover:bg-emerald-900 max-h-fit self-end" type="button" onClick={removeInstruction}>
          <Trash2 />
      </Button>
    </div>
  )
}

export default InstructionInput