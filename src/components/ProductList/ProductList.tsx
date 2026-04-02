import React from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard'; // Шлях до твоєї картки
//import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
  className?: string;
}

export const ProductList: React.FC<Props> = ({ products, className }) => {
  return (
    <div className={className}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
};
