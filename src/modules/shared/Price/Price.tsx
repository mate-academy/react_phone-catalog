import React from 'react';
import styles from './Price.module.scss';
import classNames from 'classnames';

type Props = {
  price: number;
  fullPrice?: number;
  isBigTextSize?: boolean;
  otherClass?: string;
};

export const Price: React.FC<Props> = ({
  price,
  fullPrice,
  otherClass,
  isBigTextSize = false,
}) => {
  return (
    <p
      className={classNames(styles.Price, otherClass, {
        [styles.Price_big]: isBigTextSize,
      })}
    >
      {price}

      {fullPrice && (
        <span className={styles.Price__fullPrice}>{fullPrice}</span>
      )}
    </p>
  );
};
