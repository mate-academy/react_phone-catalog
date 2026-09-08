import React from 'react';
import classNames from 'classnames';
import styles from './PriceDisplay.module.scss';

type Props = {
  price: number;
  fullPrice?: number;
  size: 'small' | 'large'; // 'small' для картки, 'large' для сторінки деталей
};

export const PriceDisplay: React.FC<Props> = ({ price, fullPrice, size }) => (
  <div className={styles['price-container']}>
    <h2
      className={classNames(styles.price, {
        [styles['price--small']]: size === 'small',
        [styles['price--large']]: size === 'large',
      })}
    >
      ${price}
    </h2>

    {fullPrice && <span className={styles['price--full']}>${fullPrice}</span>}
  </div>
);
