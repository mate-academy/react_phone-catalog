import React from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

import './Slider.scss';

type Props = {
  products: Product[],
  itemWidth: number,
  crntItemIndx: number,
  gap: number,
};

export const Slider: React.FC<Props> = ({
  products,
  itemWidth,
  crntItemIndx,
  gap,
}) => {
  return (
    <div className="Slider__container">
      <div
        className="Slider__imgs Slider__imgs--transition"
        style={{
          display: 'flex',
          gap: `${gap}px`,
          transform: `translateX(-${itemWidth * crntItemIndx}px)`,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
