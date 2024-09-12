import { FC } from 'react';

import styles from './ProductPrice.module.scss';

type TProps = {
  price?: number;
  fullPrice?: number;
  discount?: boolean;
};

export const ProductPrice: FC<TProps> = ({
  price,
  fullPrice,
  discount = false,
}) => {
  return (
    <div className={styles.prices}>
      <span>${price}</span>
      {discount && <span className={styles.discount}>${fullPrice}</span>}
    </div>
  );
};
