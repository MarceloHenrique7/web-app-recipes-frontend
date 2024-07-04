import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { User } from "@/types"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


type CreateUserRequest = { // criamos um tipo para a nossa request
    auth0Id: string;
    email: string;
    name: string
}


export const useCreateMyUser = () => { // função de criar user, para fazer a requisição para API 

    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const createUser = useMutation(async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently(); // aqui acionamos a função de buscar pelo token
        const response = await fetch(`http://localhost:8080/api/my/user`, {// response armazena a resposta dessa requisição || tecnicamente faz chamada pro backend
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passando o token para Authorization que vai ser inserido no header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if(!response.ok) { // status da resposta foi ok? se não lançamos um erro
            throw new Error("Failed to create user")
        }
    })

    return createUser
}

type UpdateMyUserRequest = {
    name: string;
}

export const useUpdateMyUser = () => { // função de criar user, para fazer a requisição para API 

    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const updateMyUser = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently(); // aqui acionamos a função de buscar pelo token
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {// response armazena a resposta dessa requisição || tecnicamente faz chamada pro backend
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passando o token para Authorization que vai ser inserido no header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        if(!response.ok) { // status da resposta foi ok? se não lançamos um erro
            throw new Error("Failed to create user")
        }
    }

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUser)

    if(isSuccess) {
        toast.success("User Profile Updated!")
    }

    if(error) {
        toast.error(error.toString())
        reset()
    }

    return { updateUser, isLoading }
}
export const useGetMyUser = () => { // função de criar user, para fazer a requisição para API 

    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const getMyUser = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently()
        
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error("Failed to get user")
        }

        return response.json()
    }
    
    const { data: currentUser, isLoading } = useQuery("fetchMyRecipe" ,getMyUser)

    return { currentUser, isLoading }

}
