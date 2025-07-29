/* eslint-disable react/display-name */
import { FC, memo } from 'react';

import { Product } from '../../../types/Product';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: FC<Props> = memo(({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} priceType="discount" />
        </li>
      ))}
    </ul>
  );
});
