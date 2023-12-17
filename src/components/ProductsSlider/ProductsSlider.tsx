import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductsSlider.scss';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
  itemWidth: number,
  crntItemIndx: number,
  gap: number,
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  itemWidth,
  crntItemIndx,
  gap,
}) => {
  return (
    <div className="ProductsSlider__screen page__container">
      <div
        className="ProductsSlider__slider ProductsSlider__slider--transition"
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
