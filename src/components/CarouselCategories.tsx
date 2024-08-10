


import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

import objectCategories from '../config/categories-config'

const CarouselCategories = () => {
    return (
        <Carousel className="w-full md:w-full">
            <CarouselContent className="font-medium text-center">
            {
                objectCategories.map((item) => (
                        <Link to={`/search/recipe/category/${item.label.toLowerCase()}`} className="flex flex-col items-center justify-center gap-2">
                        <CarouselItem key={item.label} className="md:basis-1/3 flex flex-col items-center">
                            <span className="w-[80px] h-[80px]">
                                <img src={item.src} alt={item.label} className="object-cover w-full h-full rounded-full"/>
                            </span>
                            <span className="font-bold text-sm">
                                {item.label}
                            </span>
                        </CarouselItem>
                        </Link>
                ))
            }
        </CarouselContent>
    </Carousel>
    )
}



export default CarouselCategories;

