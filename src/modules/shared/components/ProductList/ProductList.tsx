import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => (
  <div className={styles.products}>
    {products.map(product => (
      <div className={styles.products__item} key={product.id}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);
