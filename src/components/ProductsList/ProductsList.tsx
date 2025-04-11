import React from 'react';
import styles from './ProductsList.module.scss';
import CardItem from '../CardItem/CardItem';
import { Product } from '../../types/products';

type Props = {
  products: Product[];
};

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map(product => (
        <div key={product.id} className={styles.products__item}>
          <CardItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
