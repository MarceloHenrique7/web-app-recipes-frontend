import { Recipe } from "@/types"
import { Separator } from "./ui/separator"





const DetailsRecipeComponent = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="flex flex-col gap-12">
            <Separator/>
            <div className="flex flex-col gap-5">
                <span className="text-gray-900 text-3xl font-bold">
                    <h1>Ingredients</h1>
                </span>
                {recipe.ingredients && recipe.ingredients.map((item, index) => (
                    <span key={index} className="flex flex-col gap-2 p-5 rounded bg-gray-100 font-bold ">
                        <span className="text-sm">{index + 1}. {item.name} -  {item.quantity} {item.unit}</span>
                    </span>
                ))}
            </div>
            <Separator/>
            <div className="flex flex-col gap-10">
                <span className="text-gray-900 text-3xl font-bold">
                    <h1>Instructions</h1>
                </span>
                {recipe.instructions && recipe.instructions.map((item, index) => (
                <div className="flex flex-col font-bold gap-4 bg-gray-50 shadow-lg bg-opacity-50 rounded p-5">
                    <span key={index} className="flex flex-col items-justify">
                        <span className="text-2xl">{item.title}</span>
                        <span className="text-sm opacity-80">{item.subtitle}</span>
                    </span>
                    <span className="opacity-80">{item.description}</span>
                </div>

                ))}
            </div>
        <Separator/>
        <div className="flex flex-col items-center gap-5 px-10">
            <span className="text-gray-800 text-2xl font-bold">
                <h1>Nutrients</h1>
            </span>
            {recipe.nutrients?.map((item, index) => (
                <div
                    key={index}
                    className="w-full text-center md:text-center font-bold text-sm grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                    <span className="flex flex-col">
                        <span>
                            Calories
                        </span>
                        <span>
                            ({item.calories})
                        </span>
                    </span>
                    <span className="flex flex-col">
                        <span>
                            Carbohydrate
                        </span>
                        <span>
                            ({item.carbohydrate})
                        </span>
                    </span>
                    <span className="flex flex-col">
                        <span>
                            Fat
                        </span>
                        <span>
                            ({item.fat})
                        </span>
                    </span>
                    <span className="flex flex-col">
                        <span>
                            Protein
                        </span>
                        <span>
                            ({item.protein})
                        </span>
                    </span>
                    <Separator/>
                </div>
        ))}
        </div>
        </div>
    )
}


export default DetailsRecipeComponent

