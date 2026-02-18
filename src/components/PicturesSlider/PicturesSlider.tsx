import { useState, useEffect, useCallback } from 'react';
import { Button } from '@heroui/button';
import './PicturesSlider';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import React from 'react';

export const PicturesSlider = () => {
  const images = [
    '/img/banner-2.png',
    '/img/banner-3.jpeg',
    '/img/banner-4.jpeg',
  ];

  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const changeSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === current) {
        return;
      }

      setIsVisible(false);

      setTimeout(() => {
        setCurrent(nextIndex);
        setIsVisible(true);
      }, 300);
    },
    [current],
  );

  const nextSlide = useCallback(() => {
    changeSlide((current + 1) % images.length);
  }, [current, images.length, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((current - 1 + images.length) % images.length);
  }, [current, images.length, changeSlide]);

  // Autoplay + pause on hover
  useEffect(() => {
    if (isHovered) {
      return;
    }

    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <div className="flex flex-col sm:px-6 xl:px-38 gap-4">
      <h2 className="font-extrabold text-[32px] sm:text-[48px] px-6 sm:px-0">
        Welcome to Nice Gadgets store!
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center sm:gap-4">
          {/* PREV */}
          <Button
            isIconOnly
            variant="bordered"
            className="hidden sm:flex border-gray-300 w-8 sm:h-[189px] lg:h-100 rounded-full"
            onPress={prevSlide}
          >
            <CaretLeftIcon size={18} />
          </Button>

          {/* SLIDER */}
          <div
            className="relative w-full h-80 sm:h-[189px] lg:h-100 overflow-hidden sm:rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={images[current]}
              alt="slide"
              className={`
                absolute inset-0
                w-full h-full
                object-cover
                transition-[opacity,transform] duration-700 ease-out
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}
              `}
            />
          </div>

          {/* NEXT */}
          <Button
            isIconOnly
            variant="bordered"
            className="hidden sm:flex border-gray-300 w-8 sm:h-[189px] lg:h-100 rounded-full"
            onPress={nextSlide}
          >
            <CaretRightIcon size={18} />
          </Button>
        </div>

        {/* DOTS */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-1 w-[14px] transition-colors ${
                index === current ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
