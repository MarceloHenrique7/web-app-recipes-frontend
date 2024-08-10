import hero1 from '../assets/hero-0.png';
import person from '../assets/person.png';
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const Hero = () => {
  const commonContainerStyles = "h-full flex flex-col items-center justify-center text-white font-bold";
  const commonTextStyles = "text-white font-bold max-w-[768px] text-center text-3xl mb-2";
  const commonImageStyles = "w-full max-w-[400px] h-auto";

  return (
    <Carousel
      className="w-full bg-black"
      plugins={[
        Autoplay({ delay: 2000 }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="h-full bg-gradient-to-r from-emerald-500 to-black-500">
            <div className={`${commonContainerStyles}`}>
              <h1 className={commonTextStyles}>Sells your recipes</h1>
              <p className="text-sm max-w-[768px] flex-wrap">Earn Money with our platform</p>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="p-5 h-full bg-gradient-to-l from-emerald-500 to-black-500">
            <div className="h-full flex flex-col items-center justify-around">
              <h1 className={commonTextStyles}>Create and publish your recipes</h1>
              <img src={hero1} alt="Hero" className={commonImageStyles} />
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="p-5 h-full bg-gradient-to-r from-emerald-500 to-black-500">
            <div className="h-full flex flex-wrap flex-row items-center justify-around">
              <h1 className={`${commonTextStyles}`}>Special Offer</h1>
              <img src={person} alt="Person" width="200" height="200" className="max-w-[200px] max-h-[200px]" />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
