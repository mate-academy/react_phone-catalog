import React from 'react';
import styles from './ProductPrice.module.scss';
import { Typography } from '../../atoms/Typography';
import classNames from 'classnames';

type Props = {
  fullPrice: number;
  price: number;
  big?: boolean;
};

export const ProductPrice: React.FC<Props> = ({ fullPrice, price, big }) => {
  const isOnDiscount = price < fullPrice;

  return (
    <div className={styles.price}>
      <Typography variant={big ? 'h2' : 'h3'} className={styles.price__value}>
        {isOnDiscount ? price : fullPrice}
      </Typography>
      {isOnDiscount && (
        <Typography
          variant="h3"
          color="secondary"
          className={classNames(
            styles.price__value,
            styles['price__value--strikethrough'],
          )}
        >
          {fullPrice}
        </Typography>
      )}
    </div>
  );
};
