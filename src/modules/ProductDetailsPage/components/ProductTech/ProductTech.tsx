import React from 'react';

import styles from './ProductTech.module.scss';

import { Product } from '../../../../shared/types/Product/Product';

type Props = {
  productInfo: Product;
};

export const ProductTech: React.FC<Props> = ({ productInfo }) => {
  return (
    <div className={styles.productInfo__tech}>
      <h3 className={styles.productInfo__title}>Tech specs</h3>
      <hr className={styles.productInfo__line} />
      <ul className={styles.productInfo__list}>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Screen</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.screen ? productInfo.screen : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Resolution</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.resolution ? productInfo.resolution : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Processor</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.processor ? productInfo.processor : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>RAM</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.ram ? productInfo.ram : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Built in memory</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.capacity ? productInfo.capacity : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Camera</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.camera ? productInfo.camera : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Zoom</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.zoom ? productInfo.zoom : '-'}
          </p>
        </li>
        <li className={styles.productInfo__items}>
          <p className={styles.productInfo__itemTitle}>Cell</p>
          <p className={styles.productInfo__itemTech}>
            {productInfo.cell ? `${productInfo.cell.join(', ')}` : '-'}
          </p>
        </li>
      </ul>
    </div>
  );
};
