import React from 'react';
import cn from 'clsx';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductList: React.FC<Props> = ({ products, className }) => {
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
