import classNames from 'classnames';
import styles from './Price.module.scss';
import React from 'react';

type PriceProps = {
  isHot: boolean | undefined;
  isDetail?: boolean;
  price: number;
  oldPrice: number;
};

export const Price = ({ isHot, isDetail, price, oldPrice }: PriceProps) => {
  const newPriceClass = classNames(styles.price__new, {
    [styles['price__new--detail']]: isDetail,
  });

  const oldPriceClass = classNames(
    styles.price__new,
    styles['price__new--old'],
    {
      [styles['price__new--old-detail']]: isDetail,
    },
  );

  return (
    <div className={styles.price}>
      <p className={newPriceClass}>${price}</p>
      {isHot && <p className={oldPriceClass}>${oldPrice}</p>}
    </div>
  );
};
