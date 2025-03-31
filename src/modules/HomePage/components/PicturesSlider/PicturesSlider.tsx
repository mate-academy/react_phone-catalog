'use client'

import { useState, useEffect } from 'react';

type Slide = {
    desktop: string;
    mobile: string;
  };

const slides: Slide[] = [
    {
        desktop: 'img/banner-home.png',
        mobile: 'img/banner-home-mobile.png',
    },
    {
        desktop: 'img/banner-phones.png',
        mobile: 'img/banner-home-mobile.png',
    }, 
    {
        desktop: 'img/banner-phones.png',
        mobile: 'img/banner-home-mobile.png',
    }, 
];

export const PicturesSlider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMobile, setIsMobile] = useState(false);

    const updateScreen = () => {
        setIsMobile(window.innerWidth < 640);
      };

      useEffect(() => {
        updateScreen();
    
        window.addEventListener('resize', updateScreen);
        return () => window.removeEventListener('resize', updateScreen);
      }, []);

      const currentImage: string = isMobile
      ? slides[currentSlide].mobile
      : slides[currentSlide].desktop;

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => setCurrentSlide(index);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <div className="mb-20">
            <div className="flex sm:mx-5 mb-[18px] lg:mx-4 xl:mx-[156px]">
                <div className="justify-center min-w-8 max-h-[400px] bg-background-color-btn hidden sm:flex">
                    <button onClick={prevSlide}>
                        <img src="icons/arrow-left.svg" alt="left" />
                    </button>
                </div>

                 <div className="mx-auto sm:mx-5 max-h-[400px] flex items-center justify-center">
                    <img
                        key={currentSlide}
                        src={currentImage}
                        alt={`slide-${currentSlide}`}
                        className="object-cover animate-fade"
                    />
                </div>

                <div className="justify-center min-w-8 max-h-[400px] bg-background-color-btn hidden sm:flex">
                    <button onClick={nextSlide}>
                        <img src="icons/arrow-right.svg" alt="right" />
                    </button>
                </div>
            </div>
            <div className="flex justify-between w-20 mx-auto 2xl:mx-[685px]">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-[14px] h-1 transition-colors ${
                            currentSlide === index
                                ? 'bg-text-color-base-white'
                                : 'bg-background-color-btn'
                        }`}
                    />
                ))}

            </div>
        </div>
    );
};