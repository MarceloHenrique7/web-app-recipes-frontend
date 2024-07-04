import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import {z} from 'zod'

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "userName is required")
})


export type UserFormData = z.infer<typeof formSchema>


type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string; 
}

const UserProfileForm = ({ onSave, isLoading, currentUser, buttonText }: Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    })

    useEffect(() => {
        form.reset(currentUser)
    }, [currentUser, form])

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2x1 font-bold">User Profile</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled/>
                            </FormControl>
                        </FormItem>
                )}
                />
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                        </FormItem>
                )}
                />
                {isLoading ? <LoadingButton /> : <Button>{buttonText ? buttonText : 'Submit'}</Button>}
            </form>
        </Form>
        
    </div>
  )
}

export default UserProfileForm