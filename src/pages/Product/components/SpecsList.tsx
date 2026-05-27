import React from 'react';
import styles from '../ProductPage.module.scss';
import { specsConfig } from '@/shared/constants/specs';
import { ProductDetails } from '@/types/ProductDetails';

export const SpecsList: React.FC<{ product: ProductDetails }> = ({
  product,
}) => (
  <div className={styles['product-page__specs']}>
    <h3 className={styles['product-page__specs-title']}>Tech specs</h3>
    <ul className={styles['product-page__specs-list']}>
      {specsConfig.map(({ label, key, optional }) => {
        const value = product[key as keyof ProductDetails];
        if (optional && !value) return null;
        return (
          <li key={key} className={styles['product-page__specs-item']}>
            <span className={styles['product-page__specs-item-label']}>
              {label}
            </span>
            <span
              className={styles['product-page__specs-item-value']}
              title={
                Array.isArray(value) ? value.join(', ') : (value as string)
              }
            >
              {Array.isArray(value) ? value.join(', ') : (value as string)}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);
