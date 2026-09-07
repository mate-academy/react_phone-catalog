import React from 'react';

import styles from './ProductLoader.module.scss';
import { useAppSelector } from '../../../../app/hooks';

export const ProductLoader: React.FC = () => {
  const { product } = useAppSelector(state => state.productDetails);

  return (
    <div
      className={styles['product-loader']}
      style={{ backgroundColor: !product ? 'white' : '#ffffff61' }}
    >
      <div className={styles['product-loader__loader']}></div>
    </div>
  );
};
