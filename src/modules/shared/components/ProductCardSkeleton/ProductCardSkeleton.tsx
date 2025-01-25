import React from 'react';

import styles from './ProductCardSkeleton.module.scss';

import { Characteristics } from '@components/Characteristics';

type Props = {
  hidePrevPrice?: boolean;
};

export const ProductCardSkeleton: React.FC<Props> = ({ hidePrevPrice }) => {
  const characteristics: [string, string][] = [
    [' ', ' '],
    [' ', ' '],
    [' ', ' '],
  ];

  return (
    <article className={styles['product-card-skeleton']}>
      <div className={styles['product-card-skeleton__image']}></div>

      <div className={styles['product-card-skeleton__title']}>
        <br />
        <br />
      </div>

      <div className={styles['product-card-skeleton__price']}>
        <h3 className={styles['product-card-skeleton__curr-price']}>
          <br />
        </h3>
        {!hidePrevPrice && (
          <div className={styles['product-card-skeleton__prev-price']}>
            <br />
          </div>
        )}
      </div>

      <div className={styles['product-card-skeleton__divider']}></div>

      <div className={styles['product-card-skeleton__characteristic']}>
        <Characteristics characteristics={characteristics} />
      </div>

      <div className={styles['product-card-skeleton__add-to-card']}></div>
    </article>
  );
};
