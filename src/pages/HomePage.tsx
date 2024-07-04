import { useGetAllRecipes } from "@/api/MyRecipeApi";
import CardMyRecipes from "@/components/CardMyRecipe";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const { recipes, isLoading } = useGetAllRecipes()

    const navigate = useNavigate()

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname:`/search/recipe/${searchFormValues.searchQuery}`
        })
    }
    

    if (isLoading) {
        return (
            <Stack className="flex flex-col items-center justify-center" sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
            )
    }

    if (!recipes || !Array.isArray(recipes)) {
        return (
            <Stack className="flex flex-col items-center justify-center" sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
        )
    }
    
    return (
        <div className="flex flex-1 flex-col items-center gap-20">
            <div className="font-bold text-4xl">
                <h1>Recent <span className="text-emerald-900 tracking-wide">Recipes</span></h1>
            </div>
            <div className="flex flex-col w-full items-center bg-white rounded-lg py-8 flex flex-col gap-5 text-center ">
                <span className="font-bold text-gray-800 text-xl">
                    Search for a recipe
                </span>
                <SearchBar placeHolder="Search by Recipe" onSubmit={handleSearchSubmit} />
            </div>                         
            <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {recipes && recipes?.map((recipe, index) => (
                    <CardMyRecipes key={index} isHomePage={true} recipe={recipe} />
                ))}
            </div>
        </div>
    )

}


export default HomePage;
