import { Link } from "react-router-dom";


type Props = {
  total: number;
  recipe?: string;
}



const SearchResultsInfo = ({total, recipe}: Props) => {
  return (
    <div>
        <span className="font-bold">{total} Recipes found for {recipe} <Link to={"/"} className="underline text-blue-400">Change recipe</Link></span>
    </div>
  )
}

export default SearchResultsInfo;