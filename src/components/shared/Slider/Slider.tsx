import './Slider.styles.scss';
import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';

type Props = {
  products: Product[];
};

function createSlides(products: Product[], width: number): Product[][] {
  return products.reduce<Product[][]>((accum, product, index) => {
    let step;
    if (width < 640) {
      step = 2;
    } else if (width < 1199) {
      step = 3;
    } else {
      step = 4;
    }

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

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      const newActiveIndex = activeSlideIndex - 1;

      setActiveSlideIndex(newActiveIndex);

      if (slideRefs.current[activeSlideIndex] && slideRefs.current[newActiveIndex]) {

        slideRefs.current[activeSlideIndex].classList.toggle('slider__slide--active');

        slideRefs.current[newActiveIndex].classList.toggle('slider__slide--active');
        slideRefs.current[newActiveIndex].classList.toggle('slider__slide--viewed');
      }
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1) {
      const newActiveIndex = activeSlideIndex + 1;

      setActiveSlideIndex(newActiveIndex);

      if (slideRefs.current[activeSlideIndex] && slideRefs.current[newActiveIndex]) {

        slideRefs.current[activeSlideIndex].classList.toggle('slider__slide--active');
        slideRefs.current[activeSlideIndex].classList.toggle('slider__slide--viewed');

        slideRefs.current[newActiveIndex].classList.toggle('slider__slide--active');
      }
    }
  };

  return (
    <div className="slider">
      <div className="slider__top">
        <h2 className="slider__title">Hot Prices</h2>

        <div className="slider__buttons">
          <button
            className="slider__button--prev"
            disabled={activeSlideIndex === 0}
            onClick={handlePrevSlide}
          >
            prev
          </button>
          <button
            className="slider__button--next"
            disabled={activeSlideIndex === slides.length - 1}
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
                (slideRefs.current[i] = el)
                if (i === 0) {
                  slideRefs.current[i]?.classList.add('slider__slide--active')
                }
              }}
              className={classNames('slider__slide', {
              })}
            >
              {slide &&
                slide.map(card => <ProductCard key={card.id} product={card} />)}
            </div>
          ))}
      </div>
    </div>
  );
};
