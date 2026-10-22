import type React from 'react';
import styles from './Prices.module.scss';

type Props = {
  priceDiscount: number;
  priceRegular: number;
  classname?: string;
};

export const Prices: React.FC<Props> = ({
  priceDiscount,
  priceRegular,
  classname,
}) => {
  const hasDiscount = priceDiscount && priceDiscount < priceRegular;

  return (
    <div className={`${styles.prices} ${classname}`}>
      <span className={styles['price-discount']}>
        ${hasDiscount ? priceDiscount : priceRegular}
      </span>

      {hasDiscount && (
        <span className={styles['price-regular']}>${priceRegular}</span>
      )}
    </div>
  );
};
