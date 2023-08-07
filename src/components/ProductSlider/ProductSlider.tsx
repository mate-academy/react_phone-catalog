import React, { useState } from 'react';
import { Product } from '../../types/Products';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider = React.memo(({ title, products }: Props) => {
  const [translateX, setTranslateX] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideWidth = 288;
  const numSlides = products.length;
  const maxSlidesToShow = 4;

  const nextSlide = () => {
    if (currentSlide < numSlides - maxSlidesToShow) {
      setCurrentSlide(currentSlide + 1);
      setTranslateX(translateX - slideWidth);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setTranslateX(translateX + slideWidth);
    }
  };

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <div className="product-slider__title">{title}</div>
        <div className="product-slider__buttons">
          <button
            type="button"
            className="product-slider__prev product-slider__button"
            onClick={prevSlide}
          >
            &lt;
          </button>
          <button
            type="button"
            className="product-slider__next product-slider__button"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="product-slider__slider-container">
        <div
          className="product-slider__row"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'transform ease-out 0.45s',
          }}
        >
          {products.map(item => (
            <ProductCard card={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
});
