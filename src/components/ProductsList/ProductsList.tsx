import React from 'react';
import styles from './ProductsList.module.scss';
import { Card } from '../Card';
import { Card as CardType } from '../../types/Card';

type Props = {
  products: CardType[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map((product, i) => (
        <Card key={product === undefined ? i : product.id} card={product} />
      ))}
    </div>
  );
};
