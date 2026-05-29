import React from 'react';
import { Product } from '../../../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.listWrapper}>
      <h2 className={styles.title}>Brand new models</h2>
      <section className={styles.productList}>
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};
