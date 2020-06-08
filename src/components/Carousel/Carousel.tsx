import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { CarouselSlides } from './CarouselSlides';
import { CarouselDots } from './CarouselDots';
import { CarouselControl } from './CarouselControl';
import { DIRECTIONS } from '../../common/constants';

const carouselImages: CarouselSlide[] = [
  { id: 1, name: 'phones', src: './img/showcase-carousel/first.jpg' },
  { id: 2, name: 'tablets', src: './img/showcase-carousel/second.jpg' },
  { id: 3, name: 'accessories', src: './img/showcase-carousel/third.jpg' },
];

export const Carousel = () => {
  const [moveSize, setMoveSize] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const slidesLeft = carouselImages.length - 1;
  const transitionDuration = 0.7;
  const slideEl = useRef<any>(null);

  useEffect(() => {
    if (slideEl.current) {
      setSlideWidth(slideEl.current.getBoundingClientRect().width);
    }
  }, []);

  const carouselWidthHasChanged = useCallback(() => {
    const currentSlideWidth = slideEl.current.getBoundingClientRect().width;

    if (slideWidth !== currentSlideWidth) {
      setSlideWidth(currentSlideWidth);
      setMoveSize(0);
      setActiveSlide(0);

      return true;
    }

    return false;
  }, [slideWidth]);

  const changeSlide = useCallback((direction: string) => {
    if (carouselWidthHasChanged()) {
      return;
    }

    if (direction === DIRECTIONS.left) {
      if (moveSize <= 0) {
        setMoveSize(moveSize + slideWidth * slidesLeft);
        setActiveSlide(slidesLeft);
      } else {
        setMoveSize(moveSize - slideWidth);
        setActiveSlide(activeSlide - 1);
      }
    }

    if (direction === DIRECTIONS.right) {
      if (moveSize >= slideWidth * slidesLeft) {
        setMoveSize(0);
        setActiveSlide(0);
      } else {
        setMoveSize(moveSize + slideWidth);
        setActiveSlide(activeSlide + 1);
      }
    }
  }, [moveSize, slideWidth, activeSlide, slidesLeft, carouselWidthHasChanged]);

  useEffect(() => {
    const interval = setInterval(
      () => changeSlide(DIRECTIONS.right),
      4000,
    );

    return () => clearInterval(interval);
  }, [changeSlide]);

  const handleDotClick = useCallback((index: number) => {
    if (carouselWidthHasChanged()) {
      return;
    }

    if (index < activeSlide) {
      setMoveSize(moveSize - slideWidth * (activeSlide - index));
    } else {
      setMoveSize(moveSize + slideWidth * (index - activeSlide));
    }

    setActiveSlide(index);
  }, [activeSlide, moveSize, slideWidth, carouselWidthHasChanged]);

  return (
    <div className="carousel section__carousel">
      <div className="carousel__container" ref={slideEl}>
        <CarouselControl
          changeSlide={changeSlide}
          direction={DIRECTIONS.left}
        />
        <CarouselControl
          changeSlide={changeSlide}
          direction={DIRECTIONS.right}
        />
        <CarouselSlides
          slides={carouselImages}
          moveSize={moveSize}
          duration={transitionDuration}
        />
        <CarouselDots
          slides={carouselImages}
          active={activeSlide}
          goToSlide={handleDotClick}
        />
      </div>
    </div>
  );
};
