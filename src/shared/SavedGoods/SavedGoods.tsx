import React from 'react';
import styles from './SavedGoods.module.scss';
import { Link } from 'react-router-dom';
import { useMyContext } from '../../Context/ProductContexts';

type SavedGoodsProps = {
  favoriteNumber: number;
  cartNumber: number;
  setCartNumber: React.Dispatch<React.SetStateAction<number>>;
  setFavoriteNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const SavedGoods: React.FC<SavedGoodsProps> = ({
  favoriteNumber,
  cartNumber,
}) => {
  const { setIsMenuOpen } = useMyContext();

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
          <span className={styles.miniImage_badge}>{cartNumber}</span>
        </div>
      </Link>
    </div>
  );
};
