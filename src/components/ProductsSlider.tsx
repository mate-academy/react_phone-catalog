import React, { useState, useRef } from 'react';
import Pluralize from 'pluralize';
import { NavLink } from 'react-router-dom';
import { Product } from '../types/Product';
import { ProductCart } from './ProductCard';
import { CartItem } from '../types/CartItem';

type Props = {
  products: Product[];
  sliderTitle: string;
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  sliderTitle,
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const cardWidth = 272;
  const gap = 16;
  const itemsPerSlide = 4;
  const isDisabledPrevButton = currentIndex === 0;
  const isDisabledNextButton = currentIndex >= products.length - itemsPerSlide;

  const handleNextClick = () => {
    if (currentIndex < products.length - itemsPerSlide) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const translateX = currentIndex * (cardWidth + gap);

  return (
    <div className="slider">
      <div className="slider__top">
        <h1 className="slider__title">{sliderTitle}</h1>
        <div className="slider-buttons slider__buttons">
          <button
            className="button button--slider--left"
            aria-label="button-slider-left"
            type="button"
            disabled={isDisabledPrevButton}
            onClick={handlePrevClick}
          >
            &#10095;
          </button>

          <button
            className="button"
            aria-label="button-slider-right"
            type="button"
            disabled={isDisabledNextButton}
            onClick={handleNextClick}
          >
            &#10095;
          </button>

        </div>
      </div>

      <div
        className="slider__photos"
        style={{
          transform: `translateX(-${translateX}px)`,
        }}
        ref={sliderRef}
      >

        {products.map((product) => (
          <div key={product.id} className="productSlide">
            <NavLink
              className="slider__link"
              to={`/${Pluralize(product.type)}/${product.id}`}
            >

              <ProductCart
                product={product}
                setCartItems={setCartItems}
                cartItems={cartItems}
                favourites={favourites}
                setFavourites={setFavourites}
              />

            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
