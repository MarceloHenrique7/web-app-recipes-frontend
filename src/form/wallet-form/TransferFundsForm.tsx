import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import { useUpdatedMyWallet } from "@/api/MyWalletApi"
import LoadingButton from "@/components/LoadingButton"


const formSchema = z.object({
    value: z.coerce.number().min(1, "Value is Required"),
    email: z.string().min(1, "Email is Required")
})


type IFormProps = {
    value: number,
    email: string;
}

const TransferFundsForm = ({ type, submitTxt }: { type: string, submitTxt: string }) => {

    const { update, isLoading } = useUpdatedMyWallet()



    const form = useForm<IFormProps>({
        resolver: zodResolver(formSchema)
    })

    const handleWithSubmit = (data: any) => {
        console.log(data)

        update({
            type,
            value: data.value,
            email: data.email
        })
        
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleWithSubmit)}>
                <div className="flex flex-col items-center gap-5">
                    <FormField 
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormDescription>
                                    Who goes receive? 
                                </FormDescription>
                                <FormControl>
                                    <Input {...field} placeholder="email of who goes receive"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    <FormField 
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Funds</FormLabel>
                                <FormDescription>
                                    How much you wan't {type.toLowerCase()} 
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


export default TransferFundsForm

