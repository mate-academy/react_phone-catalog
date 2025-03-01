import './Slider.styles.scss';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

function createSlides(products: Product[], step: number): Product[][] {
  return products.reduce<Product[][]>((accum, product, index) => {
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
  const [slides, setSlides] = useState<Product[][]>([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(loadProducts());

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    let newSlides: Product[][] = [];

    if (windowWidth < 640) {
      newSlides = createSlides(hotPrices, 1);
    } else if (windowWidth < 1199) {
      newSlides = createSlides(hotPrices, 3);
    } else {
      newSlides = createSlides(hotPrices, 4);
    }

    setSlides(newSlides);
  }, [windowWidth]);

  return (
    <div className="slider">
      <div className="slider__top">
        <h2 className="slider__title">Hot Prices</h2>

        <div className="slider__buttons">
          <div className="slider__button--left">left</div>
          <div className="slider__button--right">right</div>
        </div>
      </div>

      <div className="slider__slides">
        {slides.map(slide => (
          <div className="slider__slide">
            {slide.map(card => (
              <ProductCard product={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
