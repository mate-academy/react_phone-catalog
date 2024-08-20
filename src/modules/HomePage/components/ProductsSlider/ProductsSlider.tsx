import styles from './ProductsSlider.module.scss';
import React from 'react';
type Props = {
  sliderLeft: () => void;
  sliderRight: () => void;
};

export const ProductsSlider: React.FC<Props> = ({
  sliderLeft,
  sliderRight,
}) => {
  return (
    <div className={styles.product__slider}>
      <button className={styles.product__button} onClick={sliderLeft}>
        <span
          className={`${styles.product__arrow}
            ${styles.arrow__left}`}
        ></span>
      </button>

      <button className={styles.product__button} onClick={sliderRight}>
        <span
          className={`${styles.product__arrow}
            ${styles.arrow__right}`}
        ></span>
      </button>
    </div>
  );
};
