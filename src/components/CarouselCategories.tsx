


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

import objectCategories from '../config/categories-config'

const CarouselCategories = () => {
    return (
        <Carousel className="max-w-[80%] md:w-full">
            <CarouselContent className="font-medium text-center">
            {
                objectCategories.map((item) => (
                    <CarouselItem className="basis-1/3 md:basis-1/5 flex flex-col items-center">
                        <Link to={`/search/recipe/category/${item.label.toLowerCase()}`} className="flex flex-col items-center gap-2">
                            <img src={item.src} className="object-cover w-14 h-14 md:w-20 md:h-20 rounded-full"/>
                            <span>
                                {item.label}
                            </span>
                        </Link>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
    )
}



export default CarouselCategories;

