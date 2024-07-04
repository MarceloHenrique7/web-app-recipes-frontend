
import React from 'react';
import hero1 from '../assets/hero-0.png'
import hero2 from '../assets/hero-1.jpg'
import person from '../assets/person.png'
import Autoplay from "embla-carousel-autoplay"

import { AspectRatio } from './ui/aspect-ratio';

import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

const Hero = () => {



  return (
    <Carousel
        className="w-full bg-black"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        >
      <CarouselContent>
        <CarouselItem>
          <div className='h-full bg-gradient-to-r from-emerald-500 to-black-500'>
              <div className="h-full flex flex-col items-center justify-center">
                <h1 className='text-3xl max-w-[768px] text-center flex-wrap text-white font-bold mb-2'>Sells your recipes</h1>
                <p className='text-sm max-w-[768px] flex-wrap text-white font-bold'>Earn Money with our plataform</p>
              </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className='p-5 h-full bg-gradient-to-l from-emerald-500 to-black-500'>
              <div className="h-full flex flex-col items-center justify-around">
                <h1 className='text-3xl max-w-[768px] text-center flex-wrap text-white font-bold'>Create and publish your recipes</h1>
                <img src={hero1} className='w-full max-w-[768px]'/>
              </div>
          </div>
        </CarouselItem>

        <CarouselItem>
        <div className='p-5 h-full bg-gradient-to-r from-emerald-500 to-black-500'>
              <div className="h-full flex flex-wrap flex-row items-center justify-around">
                <h1 className='text-4xl tracking-widest flex-wrap text-white font-bold '>Special Ofert</h1>
                <img src={person} className='max-w-[200px] max-h-[200px]'/>  
              </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
        
  )
}

export default Hero;