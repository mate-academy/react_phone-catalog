import React from 'react';
import cn from 'clsx';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <ul className={cn('mt-[24px] pageGrid', className)}>
      {products.map(product => (
        <li
          key={product.id}
          className="col-span-4 sm:col-span-6 md:col-span-4 xl:col-span-6"
        >
          <ProductCard key={product.id} product={product} />
        </li>
      ))}
    </ul>
  );
};
