import './Slider.styles.scss';
import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
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

export const Slider: React.FC<Props> = ({ products }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slides, setSlides] = useState<Product[][]>(() => {
    return createSlides(products, windowWidth);
  });
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState<number>(0);

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
        <h2 className="slider__title">Hot Prices</h2>

        <div className="slider__buttons">
          <button
            className="slider__button--prev"
            disabled={
              (windowWidth > 1199 && activeSlideIndex === 0) ||
              (windowWidth < 1199 && offset === 0)
            }
            onClick={handlePrevSlide}
          >
            prev
          </button>
          <button
            className="slider__button--next"
            disabled={
              (windowWidth > 1199 && activeSlideIndex === slides.length - 1) ||
              (windowWidth < 1199 && offset === -maxOffset)
            }
            onClick={handleNextSlide}
          >
            next
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
