import React from 'react';
import styles from './Price.module.scss';

type Props = {
  fullPrice: number;
  discountPrice: number;

  hidePrevPrice?: boolean;
};

export const Price: React.FC<Props> = ({
  fullPrice,
  discountPrice,

  hidePrevPrice,
}) => {
  return (
    <div className={styles.price}>
      <h3>${discountPrice}</h3>

      {!hidePrevPrice && fullPrice !== discountPrice && (
        <s aria-label={`$${fullPrice}`} className={styles.price__full}>
          ${fullPrice}
        </s>
      )}
    </div>
  );
};
