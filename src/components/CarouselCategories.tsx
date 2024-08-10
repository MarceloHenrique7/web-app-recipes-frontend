


import { Link } from "react-router-dom";

import objectCategories from '../config/categories-config'

const CarouselCategories = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {
                objectCategories.map((item) => (
                        <Link to={`/search/recipe/category/${item.label.toLowerCase()}`} className="flex flex-col items-center justify-center gap-2" >
                            <span className="w-[80px] h-[80px]">
                                <img src={item.src} alt={item.label} className="object-cover w-full h-full rounded-full"/>
                            </span>
                            <span className="font-bold text-sm">
                                {item.label}
                            </span>
                        </Link>
                ))
            }
        </div>
    )
}



export default CarouselCategories;

