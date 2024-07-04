import { categoriesList } from "@/config/recipe-categories-config"
import { Label } from "./ui/label"
import { ChangeEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";


type Props = {
    onChange: (category: string[]) => void;
    selectedCategories: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}


const CategoryFilter = ({ onChange, selectedCategories, isExpanded, onExpandedClick }: Props) => {

    const handleClickChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCategory = event.target.value

        const isChecked = event.target.checked
        const newCategoryList = isChecked ? [...selectedCategories, clickedCategory] : selectedCategories.filter((category) => category !== clickedCategory)
        onChange(newCategoryList)

    }

    const handleCategoryReset = () => onChange([]) 
    

  return (
    <>
        <div className="flex justify-between items-center px-2">
            <div className="text-lg font-semibold mb-2">
                Filter By Categories
            </div>
            <div className="text-md font-semibold mb-2 underline cursor-pointer text-blue-500" onClick={handleCategoryReset}>
                Reset Filters
            </div>
        </div>
        <div className="space-y-2 flex flex-col">
            {
                categoriesList?.slice(0, isExpanded ? categoriesList.length : 7).map((category) => {
                    const isSelected = selectedCategories?.includes(category)
                    return <div className="flex">
                        <input id={`category_${category}`} type="checkbox" className="hidden" value={category} checked={isSelected} onChange={handleClickChange} />
                        <Label htmlFor={`category_${category}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-600"}`}>
                            {isSelected && <Check size={20} strokeWidth={3}/>}
                            {category}
                        </Label>
                    </div>
                })
            }
            <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
                {
                    isExpanded ? (
                        <span>View Less</span>
                    ) : (
                        <span>View More</span>
                    )
                }
            </Button>
        </div>
    </>
  )
}

export default CategoryFilter