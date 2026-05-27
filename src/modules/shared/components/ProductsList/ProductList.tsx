import React from 'react';
import { Product } from '../../../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.catalog}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
