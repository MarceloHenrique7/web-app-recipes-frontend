import { Recipe } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetAllMyRecipe = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRecipeRequest = async (): Promise<Recipe[]> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/recipe`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if(!response.ok) {
            throw new Error("Failed to get a recipe")
        }

        return response.json()
    }


    const { data: recipes, isLoading } = useQuery("fetchMyRecipe", getMyRecipeRequest, { refetchInterval: 5000 })

    return { recipes, isLoading }
}

export const useGetAllRecipes = () => {

    const getAllRecipeRequest = async (): Promise<Recipe[]> => {
        const response = await fetch(`${API_BASE_URL}`, {
            method: "GET",
        })

        if(!response.ok) {
            throw new Error("Failed to get a recipe")
        }

        return response.json()
    }


    const { data: recipes, isLoading, error } = useQuery("fetchMyRecipe", getAllRecipeRequest, { refetchInterval: 5000 })


    return { recipes, isLoading, error }
}


export const useGetMyRecipe = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { recipeId } = useParams();
    console.log(recipeId)
    const getMyRecipe = async (): Promise<Recipe> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/recipe/${recipeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if(!response.ok) {
            throw new Error("Failed to get a recipe")
        }

        return response.json()
    }
    const { data: recipe, isLoading } = useQuery("fetchMyRecipe", getMyRecipe)

    return { recipe, isLoading }
}

export const useCreateMyRecipe = () => {

    const { getAccessTokenSilently } = useAuth0()

    const createMyRecipeRequest = async (recipeFormData: FormData): Promise<Recipe> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/recipe`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: recipeFormData,
        })

        if(!response.ok) {
            throw new Error("Failed to create a recipe")
        }

        return response.json();

    }

    const {
        mutate: createRecipe,
        isLoading,
        isSuccess,
        error
    } = useMutation(createMyRecipeRequest);

    if(isSuccess) {
        toast.success("Recipe create with success")
    }

    if(error) {
        toast.error("Failed to create a Recipe")
    }

    return { createRecipe, isLoading }
}

export const useUpdateMyRecipe = () => {

    const { getAccessTokenSilently } = useAuth0()
    const {recipeId} = useParams()

    const updateMyRecipeRequest = async (recipeFormData: FormData): Promise<void> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/recipe/${recipeId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: recipeFormData,
        })

        if(!response.ok) {
            throw new Error("Failed to update a recipe")
        }

        return response.json();

    }

    const {
        mutate: updateRecipe,
        isLoading,
        isSuccess,
        error
    } = useMutation(updateMyRecipeRequest);

    if(isSuccess) {
        toast.success("Recipe updated with success")
    }

    if(error) {
        toast.error("Failed to update a Recipe")
    }

    return { updateRecipe, isLoading }
}
