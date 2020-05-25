import React, { useState, useEffect, useCallback } from 'react';
import { CarouselSlides } from './CarouselSlides';
import { CarouselRectangles } from './CarouselRectangles';
import { CarouselControl } from './CarouselControl';

const carouselImages: CarouselSlide[] = [
  { id: 1, name: 'phones', src: './img/showcase-carousel/first.jpg' },
  { id: 2, name: 'tablets', src: './img/showcase-carousel/second.jpg' },
  { id: 3, name: 'accessories', src: './img/showcase-carousel/third.jpg' },
];

export const Carousel = () => {
  const [toMove, setToMove] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slideWidth = 1040;
  const slidesLeft = carouselImages.length - 1;
  const transitionDuration = 0.7;

  const changeSlide = useCallback((direction: string) => {
    if (direction === 'left') {
      if (toMove <= 0) {
        setToMove(toMove + slideWidth * slidesLeft);
        setActiveSlide(slidesLeft);
      } else {
        setToMove(toMove - slideWidth);
        setActiveSlide(activeSlide - 1);
      }
    }

    if (direction === 'right') {
      if (toMove >= slideWidth * slidesLeft) {
        setToMove(0);
        setActiveSlide(0);
      } else {
        setToMove(toMove + slideWidth);
        setActiveSlide(activeSlide + 1);
      }
    }
  }, [toMove, slideWidth, activeSlide, slidesLeft]);

  const handleRectangleClick = (index: number) => {
    if (index < activeSlide) {
      setToMove(toMove - slideWidth * (activeSlide - index));
    } else {
      setToMove(toMove + slideWidth * (index - activeSlide));
    }

    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(
      () => changeSlide('right'),
      4000,
    );

    return () => clearInterval(interval);
  });

  return (
    <div className="carousel section__carousel">
      <div className="carousel__container">
        <CarouselControl
          changeSlide={changeSlide}
          direction="left"
        />
        <CarouselControl
          changeSlide={changeSlide}
          direction="right"
        />
        <CarouselSlides
          slides={carouselImages}
          toMove={toMove}
          duration={transitionDuration}
        />
        <CarouselRectangles
          slides={carouselImages}
          active={activeSlide}
          goToSlide={handleRectangleClick}
        />
      </div>
    </div>
  );
};
