import React from 'react';
import styles from './ProductsCounter.module.scss';

type Props = {
  count: number;
};

export const ProductsCounter: React.FC<Props> = ({ count }) => {
  return (
    <p className={styles.counter}>
      {count} {count === 1 ? 'model' : 'models'}
    </p>
  );
};
