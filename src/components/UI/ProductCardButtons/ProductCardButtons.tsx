import React from 'react';
import styles from './ProductCardButtons.module.scss';
import FavouritesIcon from '@/assets/icons/FavouritesIcon.svg?react';

export const ProductCardButtons: React.FC = () => {
  return (
    <div className={styles.productButtons}>
      <button
        className={styles.productCartBtn}
        onClick={() => console.log('Added to cart')}
        aria-label="Add to cart"
      >
        <span className={styles.productCartSpan}>Add to cart</span>
      </button>
      <button
        className={styles.productFavoriteBtn}
        onClick={() => console.log('Added to favorites')}
        aria-label="Add to favorites"
      >
        <FavouritesIcon className={styles.productFavoriteIcon} />
      </button>
    </div>
  );
};
