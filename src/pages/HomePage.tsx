import { useGetAllRecipes } from "@/api/MyRecipeApi";
import CardMyRecipes from "@/components/CardMyRecipe";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarouselCategories from "@/components/CarouselCategories";

const HomePage = () => {

    const { recipes, isLoading } = useGetAllRecipes()

    const navigate = useNavigate()

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate(`/search/recipe/${searchFormValues.searchQuery}`)
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

    const recipesForFree = recipes?.filter((recipe) => recipe.forSale === false && recipe.isPublic === true)
    const recipesForSale = recipes?.filter((recipe) => recipe.forSale === true && recipe.isPublic === true)

    
    return (
        <Tabs defaultValue="free-recipes" className="flex flex-col gap-10">
            <div className="font-bold text-center text-4xl">
                <h1>Recent <span className="text-emerald-900 tracking-wide">Recipes</span></h1>
            </div>
            <div className="flex flex-col w-full items-center bg-white rounded-lg py-8 flex flex-col gap-5 text-center ">
                <span className="font-bold text-gray-800 text-xl">
                    Search for a recipe
                </span>
                <SearchBar placeHolder="Search by Recipe" onSubmit={handleSearchSubmit} />
            </div>
            <div className="flex flex-col items-center gap-10">
                <h1 className="font-bold text-4xl opacity-80 text-center">Categories</h1>
                <CarouselCategories />
            </div>
            <TabsList className="w-full flex items-center justify-between">
                <TabsTrigger value="free-recipes" className="w-full">
                    Recipes Free
                </TabsTrigger>
                <TabsTrigger value="buy-recipes" className="w-full">
                    Buy Recipes
                </TabsTrigger>
            </TabsList>
            <TabsContent value="free-recipes">
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {recipesForFree && recipesForFree?.map((recipe, index) => (
                            <CardMyRecipes key={index} isForSale={false} isHomePage={true} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="buy-recipes">
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {recipesForSale && recipesForSale?.map((recipe, index) => (
                            <CardMyRecipes isForSale={true} key={index} isHomePage={true} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </TabsContent>

        </Tabs>

    )

}


export default HomePage;
