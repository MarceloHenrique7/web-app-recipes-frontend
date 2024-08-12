import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import { useUpdatedMyWallet } from "@/api/MyWalletApi"
import LoadingButton from "@/components/LoadingButton"


const formSchema = z.object({
    value: z.coerce.number().optional()
})


type IFormProps = {
    value: number
}

const WalletFundsForm = ({ type, submitTxt }: { type: string, submitTxt: string }) => {

    const { update, isLoading } = useUpdatedMyWallet()



    const form = useForm<IFormProps>({
        resolver: zodResolver(formSchema)
    })

    const handleWithSubmit = (value: any) => {
        console.log(value)
        update({
            value,
            type,
        })
        
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleWithSubmit)}>
                <div className="flex flex-col items-center gap-5">
                    <FormField 
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Funds</FormLabel>
                                <FormDescription>
                                    How much you wan't add in your wallet
                                </FormDescription>
                                <FormControl>
                                    <Input {...field} placeholder="enter the value"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        {
                            isLoading ? (
                                <LoadingButton />
                            ) : (
                                <Button className="self-start bg-emerald-700 hover:bg-emerald-900">
                                    {submitTxt}
                                </Button>
                            )
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}


export default WalletFundsForm

