import type React from 'react';
import styles from './ProductsTotal.module.scss';

type Props = {
  productsTotal: number;
};

export const ProductsTotal: React.FC<Props> = ({ productsTotal }) => {
  return (
    <div className={styles['product-quantity']}>{productsTotal} models</div>
  );
};
