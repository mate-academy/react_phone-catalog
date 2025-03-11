import './Slider.styles.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

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

export const Slider = () => {
  const dispatch = useAppDispatch();

  const hotPrices = useAppSelector(state => state.products.products)
    .filter(product => product.price)
    .slice(0, 20);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const slides = useMemo(() => createSlides(hotPrices, windowWidth), [hotPrices, windowWidth]);

  const [prevSlide, setPrevSlide] = useState<Product[]>();
  const [nextSlide, setNextSlide] = useState<Product[]>();
  const [isPrevActive, setIsPrevActive] = useState<boolean>(true);
  const [prevSlideIndex, setPrevSlideIndex] = useState<number>(0);
  const [nextSlideIndex, setNextSlideIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  useEffect(() => {
      setPrevSlide(slides[0]);
      setNextSlide(slides[1] || slides[slides.length - 1]);
      setPrevSlideIndex(0);
      setNextSlideIndex(slides.length > 1 ? 1 : 0);
  }, [hotPrice]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handlePrevSlide = () => {
    if (prevSlideIndex > 0) {
      const newPrevIndex = prevSlideIndex - 1;
      setPrevSlide(slides[newPrevIndex]);
      setPrevSlideIndex(newPrevIndex);
      setIsPrevActive(true);

      console.log(prevSlideIndex);
    }
  };

  const handleNextSlide = () => {
    if (nextSlideIndex < slides.length - 1) {
      const newNextIndex = nextSlideIndex + 1;
      setNextSlide(slides[newNextIndex]);
      setNextSlideIndex(newNextIndex);
      setIsPrevActive(false);
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
            disabled={nextSlideIndex === slides.length - 1}
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
