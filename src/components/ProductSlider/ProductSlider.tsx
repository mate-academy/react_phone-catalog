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
    <div className="product__slider">
      <div className="product__header">
        <div className="product__title">{title}</div>
        <div className="product__buttons">
          <button
            type="button"
            className="product__prev product__button"
            onClick={prevSlide}
          >
            &lt;
          </button>
          <button
            type="button"
            className="product__next product__button"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="product__slider-container">
        <div
          className="product__row"
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
