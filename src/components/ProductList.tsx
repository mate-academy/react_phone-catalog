import React from 'react';
import { ProductCard } from './ProductCard';
import { SkeletonCard } from './SkeletonCard';
import './ProductList.scss';
import { Product } from '../types/Product';

type Props = {
  products?: Product[];
  trackRef?: React.RefObject<HTMLDivElement>;
  mode?: 'grid' | 'slider';
  isLoading?: boolean;
};

export const ProductList: React.FC<Props> = ({
  products = [],
  trackRef,
  mode = 'grid',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={`product-list product-list--${mode}`}>
        {Array.from({ length: mode === 'slider' ? 10 : 16 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`product-list product-list--${mode}`}>
      <div
        className={`product-list__track product-list__track--${mode}`}
        ref={mode === 'slider' ? trackRef : undefined}
      >
        {products.map(product => (
          <div
            key={product.id}
            className={`product-list__item product-list__item--${mode}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
