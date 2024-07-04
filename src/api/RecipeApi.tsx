import { SearchState } from "@/pages/SearchPage"
import { RecipeSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useSearchRecipes = (searchState: SearchState, recipe?: string) => {
    const createSearchRequest = async (): Promise<RecipeSearchResponse> => {
        const params = new URLSearchParams()

        params.set("searchQuery",searchState.searchQuery)
        params.set("selectedCategories", searchState.selectedCategories.join(''))
        params.set("page", searchState.page.toString())
        params.set("sortOption", searchState.sortOption)
        const response = await fetch(`${API_BASE_URL}/api/recipe/search/${recipe}?${params.toString()}`)

        if (!response.ok) {
            throw new Error("Failed to get recipe")
        }

        return response.json()
    }
    const { data: results, isLoading } = useQuery(["searchRecipes", searchState], createSearchRequest, {enabled: !!recipe})
        
    return { results, isLoading }
     
}
