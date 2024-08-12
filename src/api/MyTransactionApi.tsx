import { Transaction } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface IBodyProps extends Omit<Transaction, "id"> {  }

export const useCreateMyTransaction = () => {

    const { getAccessTokenSilently } = useAuth0()


    const createMyTransaction = async ( transactionForm: IBodyProps): Promise<Transaction> => {
        console.log(transactionForm)
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/transaction/create/wallet`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionForm)
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Fetch request is BAD")
        }

        return response.json()
    }

    const { mutate: createTransaction, isLoading } = useMutation(createMyTransaction, {
        onSuccess: () => {
            toast.success("Approved transaction")
        },
        onError: (error: any) => {
            toast.error(error.message || "An error occurred")
        }
    })

    return { createTransaction, isLoading }


}
export const useGetMyTransaction = () => {

    const { getAccessTokenSilently } = useAuth0()

    const getMyTransaction = async (): Promise<Transaction[]> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/transaction`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error("Fetch request is BAD")
        }

        return response.json()
    }

    const { data: transactions, isLoading } = useQuery("fetchRequest",getMyTransaction)

    return { transactions, isLoading }


}



export const useGetMyTransactionStripe = () => {

    const {getAccessTokenSilently} = useAuth0();

    const getMyTransaction = async () => {

        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/transaction`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error("Unable to create checkout session")
        }

        return response.json()

    }


    const { data: transactions, isLoading } = useQuery("fetchRequestTransactions", getMyTransaction)

    return {
        transactions,
        isLoading
    }
}



type CheckoutSessionRequest = {
    transactionType: string;
    currency: string;
    method: string;
    amount: number;
    userId: string;
    recipeId: string
}


export const useCreateCheckoutSession = () => {


    const { getAccessTokenSilently } = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {

        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/transaction/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkoutSessionRequest)
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Fetch request is BAD")
        }

        return response.json()
    }
    

    const { mutateAsync: createCheckoutSession, isLoading } = useMutation(createCheckoutSessionRequest, {
        onSuccess: () => {
            toast.success("Approved transaction")
        },
        onError: (error: any) => {
            toast.error(error.message || "An error occurred")
        }
    })



    return { createCheckoutSession, isLoading }
}
