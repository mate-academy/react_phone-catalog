/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './FirstPart.module.scss';
import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../../../context/ProductsContext/types/CurrentProduct';

export const FirstPart: React.FC = () => {
  const { currentProduct } = useContext(ProductsContext);
  const { priceDiscount, priceRegular } = currentProduct as CurrentProduct;

  return (
    <div className={styles['first-part']}>
      <div className={styles['price-discount']}>${priceDiscount}</div>
      <div className={styles['price-regular']}>${priceRegular}</div>
    </div>
  );
};
