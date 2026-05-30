import React from 'react';
import styles from './Details.module.scss';
import classNames from 'classnames';
import { DetailsProduct, Product } from '../../../types/productTypes';

type DetailsProps = {
  isDetail?: boolean;
  item: Product | DetailsProduct;
};

export const Details = ({ isDetail, item }: DetailsProps) => {
  const wrapper = classNames(styles.container, {
    [styles['container--margin']]: isDetail,
  });

  return (
    <div className={wrapper}>
      <div className={styles.productDescription}>
        <p className={styles.productDescription__label}>Screen</p>
        <p>{item.screen}</p>
      </div>
      <div className={styles.productDescription}>
        <p className={styles.productDescription__label}>Capacity</p>
        <p>{item.capacity}</p>
      </div>
      <div className={styles.productDescription}>
        <p className={styles.productDescription__label}>Ram</p>
        <p>{item.ram}</p>
      </div>
    </div>
  );
};
