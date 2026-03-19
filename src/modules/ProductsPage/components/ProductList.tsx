import React from 'react';
import cn from 'clsx';
import { ProductCard } from './ProductCard';
import { Product } from '../../../types';
import { ProductCardSkeleton } from '../../shared/components/ui/Loader/ProductCardSkeleton';

type Props = {
  products: Product[];
  isLoading?: boolean;
  className?: string;
  skeletonCount?: number;
};

export const ProductList: React.FC<Props> = ({
  products,
  isLoading = false,
  className,
  skeletonCount = 8,
}) => {
  if (isLoading) {
    return (
      <ul className={cn('pageGrid mt-6', className)}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <li
            key={`skeleton-${idx}`}
            className="col-span-4 sm:col-span-6 md:col-span-4 xl:col-span-6"
          >
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn('pageGrid mt-6', className)}>
      {products.map(product => (
        <li
          key={product.itemId}
          className="col-span-4 sm:col-span-6 md:col-span-4 xl:col-span-6"
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
