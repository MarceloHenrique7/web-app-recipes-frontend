import banner2 from '../assets/banner-2.png';
import banner3 from '../assets/earn-money.png';
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

import restaurantBg from '../assets/bg-web-app.png'


const Hero = () => {
  return (
    <Carousel
      className="w-full h-full bg-black"
      plugins={[
        Autoplay({ delay: 2000 }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div>
            <img src={restaurantBg} className="w-full max-h-[600px] object-cover"/> {/* w-full para ocupar toda largura do container || max-h-[600px] especifica altura maxima || object-cover siginifica que ele vai cobrir toda sua proporção para que a imagem nao fique distorcida */}
          </div>
        </CarouselItem>

        <CarouselItem>
          <div>
              <img src={banner2} alt="Hero" className="w-full max-h-[600px] object-cover" />
          </div>
        </CarouselItem>

        <CarouselItem>
          <div>
              <img src={banner3} alt="Person" className="w-full max-h-[600px] object-cover" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
