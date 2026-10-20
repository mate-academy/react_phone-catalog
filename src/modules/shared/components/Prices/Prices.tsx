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
  return (
    <div className={`${styles.prices} ${classname}`}>
      {priceDiscount && (
        <span className={styles['price-discount']}>${priceDiscount}</span>
      )}

      <span className={styles['price-regular']}>${priceRegular}</span>
    </div>
  );
};
