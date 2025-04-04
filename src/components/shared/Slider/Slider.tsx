import './Slider.styles.scss';
import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  category: 'newModels' | 'hotPrices' | 'mayLike';
  products: Product[];
};

function createSlides(products: Product[], width: number): Product[][] {
  return products.reduce<Product[][]>((accum, product, index) => {
    const step = width < 1199 ? 20 : 4;

    const splitIndex = index % step;
    if (splitIndex === 0) {
      accum.push([product]);
    } else {
      accum[accum.length - 1].push(product);
    }

    return accum;
  }, []);
}

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
          <button
            className="slider__button slider__button--prev"
            disabled={disabledLeft}
            onClick={handlePrevSlide}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                fill={disabledLeft ? '#B4BDC3' : '#313237'}
              />
            </svg>
          </button>
          <button
            className="slider__button slider__button--next"
            disabled={disabledRight}
            onClick={handleNextSlide}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill={disabledRight ? '#B4BDC3' : '#313237'}
              />
            </svg>
          </button>
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
