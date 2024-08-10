import { useSearchRecipes } from "@/api/RecipeApi";
import CategoryFilter from "@/components/CategoryFilter";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDownOption from "@/components/DropDownOption";
import CardResultSearch from "@/components/CardResultSearch";
import { CircularProgress } from "@mui/material";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCategories: string[];
  sortOption: string;
}


const SearchPage = () => {

  const navigate = useNavigate()
  
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCategories: [],
    sortOption: "lastUpdate"
  })

  let { recipe } = useParams()

  const { results, isLoading } = useSearchRecipes(searchState, recipe);

  console.log(searchState, recipe)


  const recipesForSale = useMemo(() => 
    results?.data?.filter((recipe) => recipe.forSale === true && recipe.isPublic === true), 
    [results]
);
  
  const recipesForFree = useMemo(() => 
    results?.data?.filter((recipe) => recipe.forSale === false && recipe.isPublic === true), 
    [results]
);

  const [isExpanded, setIsExpanded] = useState<boolean>(false)



  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1
    }))
  }
  
  const setSelectedCategories = (selectedCategories: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCategories,
      page: 1
    }))
  } 

  const handleSearchSubmit = (searchForm: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchForm.searchQuery,
      page: 1
    }))
    navigate({
      pathname: `/search/recipe/${searchForm.searchQuery}`
    })
  }


  if (isLoading) {
    return <span className="flex items-center justify-center"><CircularProgress variant="indeterminate"/></span>
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5">
        <div>
            <CategoryFilter onChange={setSelectedCategories} isExpanded={isExpanded} selectedCategories={searchState.selectedCategories} onExpandedClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}/>
        </div>
        <div id="main-content" className="flex flex-col gap-5">
            <SearchBar searchQuery={searchState.searchQuery} onSubmit={handleSearchSubmit} placeHolder="Search for a recipe" />

          <Tabs defaultValue="free-recipes">    
            <TabsList className="w-full flex items-center justify-between mb-5 mt-5">
                <TabsTrigger value="free-recipes" className="w-full">
                    Recipes Free
                </TabsTrigger>
                <TabsTrigger value="buy-recipes" className="w-full">
                    Buy Recipes
                </TabsTrigger>
            </TabsList>
            <TabsContent value="free-recipes">
                <div className="flex flex-row justify-between">
                  <SearchResultsInfo total={recipesForFree?.length || 0} recipe={recipe}/>
                  <DropDownOption sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)}/>
                </div>
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {
                      recipesForFree?.length === 0 ? (
                        <span>No Results</span>
                      ) : (
                        recipesForFree?.map((recipe) => (
                          <CardResultSearch isForSale={false} recipe={recipe}/>
                        ))
                      )
                    }
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="buy-recipes">
                <div className="flex flex-row justify-between">
                  <SearchResultsInfo total={recipesForSale?.length || 0} recipe={recipe}/>
                  <DropDownOption sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)}/>
                </div>
                <div className="flex flex-1 flex-col items-center gap-20">
                    <div className="w-full self-center grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {
                      recipesForSale?.length === 0 ? (
                        <span>No Results</span>
                      ) : (
                        recipesForSale?.map((recipe) => (
                          <CardResultSearch isForSale={true} recipe={recipe}/>
                        ))
                      )
                    }
                    </div>
                </div>
            </TabsContent>

        </Tabs>
        </div>

    </div>
    
  )
}

export default SearchPage