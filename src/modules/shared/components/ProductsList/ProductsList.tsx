import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <div className={styles.productsList__item} key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
