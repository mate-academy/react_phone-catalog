import React from 'react';
import ProductCard from '../../../ProductCard';
import { Product } from '../../../../types/product';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(item => (
        <div key={item.id} className={styles.list__item}>
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
