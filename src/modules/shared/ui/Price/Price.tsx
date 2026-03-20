import React from 'react';
import cn from 'classnames';
import styles from './Price.module.scss';

interface Props {
  price: number;
  fullPrice: number;
  isLarge?: boolean;
  showDiscount?: boolean;
}

export const Price: React.FC<Props> = ({
  price,
  fullPrice,
  isLarge = false,
  showDiscount = true,
}) => {
  const hasDiscount = showDiscount && Number(fullPrice) > Number(price);

  return (
    <div className={cn(styles.price, { [styles.priceLarge]: isLarge })}>
      <span className={styles.current}>${price}</span>

      {hasDiscount && <span className={styles.old}>${fullPrice}</span>}
    </div>
  );
};
