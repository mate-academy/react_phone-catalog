import React from 'react';
import { ProductDetails } from '../../shared/types/ProductDetails';
import styles from './ProductSpecs.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductSpecs: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={styles.detail__characteristics}>
      <h2 className={styles['detail__characteristics-title']}>Tech specs</h2>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Screen
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.screen}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Resolution
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.resolution}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Processor
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.processor}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          RAM
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.ram}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Built in memory
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.capacity}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Camera
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.camera}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Zoom
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.zoom}
        </span>
      </div>
      <div className={styles['detail__characteristics-container']}>
        <span className={styles['detail__characteristics-container__name']}>
          Cell
        </span>
        <span className={styles['detail__characteristics-container__info']}>
          {productDetails.cell.join(', ')}
        </span>
      </div>
    </div>
  );
};
