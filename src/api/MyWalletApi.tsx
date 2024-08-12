import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"










const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyWallet = () => {

    const {getAccessTokenSilently} = useAuth0()

    const getMyWallet = async () => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/wallet`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (!response) {
            throw new Error('Unable get Wallet')
        }

        return response.json()
    }


    const { data: wallet, isLoading } = useQuery("fetchGetMyWallet", getMyWallet)

    return { wallet, isLoading }
    
}


type formData = {
    type: string;
    value: number;
    email?: string;
}

export  const useUpdatedMyWallet = () => {

    const {getAccessTokenSilently} = useAuth0()

    const updateMyWallet = async (dataForm: formData) => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/wallet`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(dataForm)
        })

        if (!response) {
            throw new Error('Unable get Wallet')
        }

        return response.json()
    }

    const { mutate: update, isLoading, isSuccess, error, reset } = useMutation(updateMyWallet)

    if (isSuccess) {
        toast.success('Operation success')
    }
    if (error) {
        toast.error('The operation failed')
        reset()
    }

    return { update, isLoading }
    
}


