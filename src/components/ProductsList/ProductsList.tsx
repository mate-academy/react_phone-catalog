import React from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../types/products';
import ProductItem from '../ProductItem/ProductItem';

type Props = {
  products: Product[];
};

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map(product => (
        <div key={product.id} className={styles.products__item}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
