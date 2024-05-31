import { useState } from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';

export const ProductCard = () => {
  const [isActiveFavorite, setIsActiveFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleFavorite = () => {
    setIsActiveFavorite(!isActiveFavorite);
  };

  const handleAddToCart = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.productCard}>
      <img
        src="./img/phones/apple-iphone-xs-max/silver/00.webp"
        alt="product photo"
        className={styles.productPhoto}
      />

      <p className={styles.productDescription}>
        Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
      </p>

      <div className={styles.productPriceContainer}>
        <h3 className={styles.productPrice}>$799</h3>
        <p className={styles.productDiscount}>$899</p>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.techCharacteristicsContainer}>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>Screen</p>
          <p className={styles.characteristicValue}>5.8” OLED</p>
        </div>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>Capacity</p>
          <p className={styles.characteristicValue}>64 GB</p>
        </div>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>RAM</p>
          <p className={styles.characteristicValue}>4 GB</p>
        </div>
      </div>

      <div className={styles.btnsContainer}>
        <button
          className={classNames(styles.addToCardBtn, {
            [styles.addedToCart]: isAdded,
          })}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button
          className={classNames(styles.favoriteBtn, {
            [styles.favoriteActive]: isActiveFavorite,
          })}
          onClick={handleFavorite}
        ></button>
      </div>
    </div>
  );
};
