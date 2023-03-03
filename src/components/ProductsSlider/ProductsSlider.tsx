import React, { useState } from 'react';
import './ProductsSlider.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [transform, setTransform] = useState(0);

  const handleNext = () => {
    if (transform !== -(products.length - 4) * 288) {
      setTransform(transform - 288);
    }
  };

  const handlePrev = () => {
    if (transform !== 0) {
      setTransform(transform + 288);
    }
  };

  return (
    <div className="products-slider">
      <div className="products-slider__buttons-wrapper">
        <button
          type="button"
          className="products-slider__button"
          onClick={handlePrev}
          disabled={!transform}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M5.47136 0.528606C5.21101 0.268256 4.7889 0.268256 4.52855 0.528606L0.528555 4.52861C0.268205 4.78896 0.268205 5.21107 0.528555 5.47141L4.52855 9.47141C4.7889 9.73176 5.21101 9.73176 5.47136 9.47141C5.73171 9.21107 5.73171 8.78896 5.47136 8.52861L1.94277 5.00001L5.47136 1.47141C5.73171 1.21107 5.73171 0.788955 5.47136 0.528606Z"
              fill={transform ? '#313237' : '#e2e6e9'}
            />
          </svg>
        </button>

        <button
          type="button"
          className="products-slider__button"
          onClick={handleNext}
          disabled={transform === (-(products.length - 4) * 288)}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z"
              fill={
                transform !== (-(products.length - 4) * 288)
                  ? '#313237'
                  : '#e2e6e9'
              }
            />
          </svg>
        </button>
      </div>

      <div
        className="products-slider__slides"
        style={{ transform: `translateX(${transform}px)` }}
      >
        {products.map(product => (
          <ProductCard
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};
