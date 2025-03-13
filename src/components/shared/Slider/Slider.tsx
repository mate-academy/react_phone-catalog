import './Slider.styles.scss';
import React, { useEffect, useState } from 'react';

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
      step = 1;
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
  const [prevSlide, setPrevSlide] = useState<Product[]>();
  const [nextSlide, setNextSlide] = useState<Product[]>();
  const [isPrevActive, setIsPrevActive] = useState<boolean>(true);
  const [prevSlideIndex, setPrevSlideIndex] = useState<number>(0);
  const [nextSlideIndex, setNextSlideIndex] = useState<number>(0);

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
    setPrevSlide(slides[0]);
    setNextSlide(slides[1] || slides[slides.length - 1]);
    setPrevSlideIndex(0);
    setNextSlideIndex(1);
  }, [slides]);

  const handlePrevSlide = () => {
    if (prevSlideIndex > 0) {
      const newPrevIndex = prevSlideIndex - 1;

      setNextSlide(prevSlide);
      setNextSlideIndex(prevSlideIndex);

      setPrevSlide(slides[newPrevIndex]);
      setPrevSlideIndex(newPrevIndex);
    }
  };

  const handleNextSlide = () => {
    if (nextSlideIndex < slides.length - 1) {
      const newNextIndex = nextSlideIndex + 1;

      setPrevSlide(nextSlide);
      setPrevSlideIndex(nextSlideIndex);

      setNextSlide(slides[newNextIndex]);
      setNextSlideIndex(newNextIndex);


      // setIsPrevActive(false);

      // setTimeout(() => setIsPrevActive(true), 300);
    }
  };

  return (
    <div className="slider">
      <div className="slider__top">
        <h2 className="slider__title">Hot Prices</h2>

        <div className="slider__buttons">
          <button
            className="slider__button--prev"
            disabled={prevSlideIndex === 0}
            onClick={handlePrevSlide}
          >
            prev
          </button>
          <button
            className="slider__button--next"
            // disabled={nextSlideIndex === slides.length - 1}
            onClick={handleNextSlide}
          >
            next
          </button>
        </div>
      </div>

      <div className="slider__slides">
        <div
          className={classNames('slider__slide', 'slider__slide--prev', {
            'slider__slide--prev-active': isPrevActive,
          })}
        >
          {prevSlide &&
            prevSlide.map(card => <ProductCard key={card.id} product={card} />)}
        </div>

        <div
          className={classNames('slider__slide', 'slider__slide--next', {
            'slider__slide--next-active': !isPrevActive,
          })}
        >
          {nextSlide &&
            nextSlide.map(card => <ProductCard key={card.id} product={card} />)}
        </div>
      </div>
    </div>
  );
};
