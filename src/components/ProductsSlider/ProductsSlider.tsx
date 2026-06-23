import React, { useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [offset, setOffset] = useState(0);
  const step = 1;
  const frameSize = 4;
  const gap = 16;

  const handleNext = () => {
    setOffset(prev => Math.min(prev + step, products.length - frameSize));
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - step, 0));
  };

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>
        <div className="products-slider__buttons">
          <button
            type="button"
            className="products-slider__btn"
            onClick={handlePrev}
            disabled={offset === 0}
            aria-label="Previous slide"
          />
          <button
            type="button"
            className="products-slider__btn products-slider__btn--next"
            onClick={handleNext}
            disabled={offset >= products.length - frameSize}
            aria-label="Next slide"
          />
        </div>
      </div>

      <div className="products-slider__container">
        <div
          className="products-slider__content"
          style={{
            transform: `translateX(calc(-${offset * (100 / frameSize)}% - ${
              offset * (gap / frameSize)
            }px))`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className="products-slider__card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
