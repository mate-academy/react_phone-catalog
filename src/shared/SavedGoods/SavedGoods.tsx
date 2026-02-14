import React from 'react';
import styles from './SavedGoods.module.scss';
import { Link } from 'react-router-dom';
import { useMyContext } from '../../Context/ProductContexts';

export const SavedGoods: React.FC = () => {
  const { setIsMenuOpen, favoriteNumber, amountItems } = useMyContext();

  return (
    <div className={styles.savedGoods}>
      <Link
        to={'/favorites'}
        className={`${styles.savedGoods_button} ${styles.savedGoods_favorite}`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <div className={styles.miniImage_container}>
          <img
            className={styles.miniImage_image}
            src="img/Additional images/icons/white_heart.svg"
            alt="heart"
          />
          <span className={styles.miniImage_badge}>{favoriteNumber}</span>
        </div>
      </Link>
      <Link
        to={'/cart'}
        className={`${styles.savedGoods_button} ${styles.savedGoods_cart}`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <div className={styles.miniImage_container}>
          <img
            className={styles.miniImage_image}
            src="img/Additional images/icons/Shopping cart.svg"
            alt="cart"
          />
          <span className={styles.miniImage_badge}>{amountItems}</span>
        </div>
      </Link>
    </div>
  );
};
