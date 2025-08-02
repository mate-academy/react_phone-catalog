import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  list: Product[];
};

export const ProductList: React.FC<Props> = ({ list }) => {
  return (
    <div className={styles.container}>
      {list.map(product => (
        <div className={styles.container__item} key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
