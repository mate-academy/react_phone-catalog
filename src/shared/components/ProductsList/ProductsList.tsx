import React from 'react';
import { Product } from '@/shared/types';

import { ProductCard, ProductCardSkeleton } from '../ProductCard';

import cn from 'classnames';
import './ProductsList.scss';

type Props = {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export const ProductsList: React.FC<Props> = ({
  skeletonCount = 8,
  products,
  isLoading,
  className,
}) => {
  if (isLoading) {
    return (
      <ul
        className={cn('products-list', className)}
        aria-label="Loading products"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <li key={`skeleton-${index}`} className="products-list__item">
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn('products-list', className)}>
      {products.map(product => (
        <li key={product.id} className="products-list__item">
          <ProductCard key={product.id} product={product} />
        </li>
      ))}
    </ul>
  );
};
