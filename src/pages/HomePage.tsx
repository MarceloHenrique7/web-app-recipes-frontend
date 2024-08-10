import { useGetAllRecipes } from "@/api/MyRecipeApi";
import CardMyRecipes from "@/components/CardMyRecipe";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

const HomePage = () => {
    const { recipes, isLoading } = useGetAllRecipes();
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate(`/search/recipe/${searchFormValues.searchQuery}`);
    };

    const recipesForFree = useMemo(() => 
        recipes?.filter((recipe) => recipe.forSale === false && recipe.isPublic === true), 
        [recipes]
    );

    /*
        Se você tem uma função que realiza cálculos pesados,
        como operações matemáticas complexas, filtragem de grandes
        listas ou processamento de dados, você pode usar useMemo para
        memorizar o resultado desses cálculos.
    */

    const recipesForSale = useMemo(() => 
        recipes?.filter((recipe) => recipe.forSale === true && recipe.isPublic === true), 
        [recipes]
    );

    if (isLoading || !recipes) {
        return (
            <Stack className="flex flex-col items-center justify-center" sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="primary" />
            </Stack>
        );
    }

    return (
        <Tabs defaultValue="free-recipes" className="flex flex-col items-center justify-center gap-10">
            <div className="font-bold text-center text-4xl">
                <h1>Recent <span className="text-emerald-900 tracking-wide">Recipes</span></h1>
            </div>
            <div className="flex flex-col w-full items-center bg-white rounded-lg py-8 gap-5 text-center">
                <span className="font-bold text-gray-800 text-xl">
                    Search for a recipe
                </span>
                <SearchBar placeHolder="Search by Recipe" onSubmit={handleSearchSubmit} />
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
                        {recipesForFree?.map((recipe, index) => (
                            <CardMyRecipes key={index} isForSale={false} isHomePage={true} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="buy-recipes">
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {recipesForSale?.map((recipe, index) => (
                            <CardMyRecipes isForSale={true} key={index} isHomePage={true} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default HomePage;
