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
      <div className={styles.listWindow}>
        <section className={styles.productList}>
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper} data-card>
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
