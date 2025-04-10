import './Slider.styles.scss';
import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowButton } from '../Buttons/ArrowButton/ArrowButton';
import { createSlides } from '../../../utils/helpers';

type Props = {
  category: 'newModels' | 'hotPrices' | 'mayLike';
  products: Product[];
};

export const Slider: React.FC<Props> = ({ category, products }) => {
  const categoryMap = {
    newModels: 'Brand new models',
    hotPrices: 'Hot prices',
    mayLike: 'You may also like',
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slides, setSlides] = useState<Product[][]>(() => {
    return createSlides(products, windowWidth);
  });
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState<number>(0);

  const disabledLeft =
    (windowWidth > 1199 && activeSlideIndex === 0) ||
    (windowWidth < 1199 && offset === 0);

  const disabledRight =
    (windowWidth > 1199 && activeSlideIndex === slides.length - 1) ||
    (windowWidth < 1199 && offset === maxOffset);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const newSlides = createSlides(products, windowWidth);

    setSlides(newSlides);
  }, [windowWidth]);

  useEffect(() => {
    if (slideRefs.current[0]) {
      const slideWidth = slideRefs.current[0].offsetWidth;

      setMaxOffset(-slideWidth + windowWidth - 50);
    }
  }, [windowWidth, slides]);

  const handlePrevSlide = () => {
    const step = windowWidth > 640 ? 400 : 150;

    if (activeSlideIndex > 0 && windowWidth > 1199) {
      const newActiveIndex = activeSlideIndex - 1;

      setActiveSlideIndex(newActiveIndex);

      if (
        slideRefs.current[activeSlideIndex] &&
        slideRefs.current[newActiveIndex]
      ) {
        slideRefs.current[activeSlideIndex].classList.remove(
          'slider__slide--active',
        );

        slideRefs.current[newActiveIndex].classList.remove(
          'slider__slide--viewed',
        );
        slideRefs.current[newActiveIndex].classList.add(
          'slider__slide--active',
        );
      }
    } else {
      setOffset(prev => Math.min(prev + step, 0));
    }
  };

  const handleNextSlide = () => {
    const step = windowWidth > 640 ? 400 : 150;

    if (activeSlideIndex < slides.length - 1 && windowWidth > 1199) {
      const newActiveIndex = activeSlideIndex + 1;

      setActiveSlideIndex(newActiveIndex);

      if (
        slideRefs.current[activeSlideIndex] &&
        slideRefs.current[newActiveIndex]
      ) {
        slideRefs.current[activeSlideIndex].classList.remove(
          'slider__slide--active',
        );
        slideRefs.current[activeSlideIndex].classList.add(
          'slider__slide--viewed',
        );

        slideRefs.current[newActiveIndex].classList.add(
          'slider__slide--active',
        );
      }
    } else {
      setOffset(prev => Math.max(prev - step, maxOffset));
    }
  };

  return (
    <div className="slider">
      <div className="slider__top">
        <h2 className="slider__title"> {categoryMap[category]}</h2>

        <div className="slider__buttons">
          <ArrowButton direction={'back'} disabled={disabledLeft} handleClick={handlePrevSlide}/>
          <ArrowButton  direction={'forward'} disabled={disabledRight} handleClick={handleNextSlide}/>
        </div>
      </div>

      <div className="slider__slides">
        {slides.length > 0 &&
          slides.map((slide, i) => (
            <div
              key={i}
              ref={el => {
                slideRefs.current[i] = el;
                if (i === 0 && windowWidth > 1199) {
                  slideRefs.current[i]?.classList.add('slider__slide--active');
                }
              }}
              className="slider__slide"
              style={{
                transform:
                  windowWidth < 1199 ? `translateX(${offset}px)` : undefined,
              }}
            >
              {slide &&
                slide.map(card => (
                  <ProductCard key={card.id} product={card} slider={true} />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
