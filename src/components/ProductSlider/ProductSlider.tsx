import React from 'react';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__buttons">
          <div className="button--arrow button--arrow--disabled">
            <img src="/icons/arrow_left.svg" alt="Arrow left" />
          </div>
          <div className="button--arrow">
            <img src="/icons/arrow_right.svg" alt="Arrow right" />
          </div>
        </div>
      </div>

      <div className="product-slider__container">
        <ProductCard oldPrice={1299} />
        <ProductCard oldPrice={1299} />
        <ProductCard oldPrice={1299} />
        <ProductCard oldPrice={1299} />
      </div>
    </div>
  );
};
