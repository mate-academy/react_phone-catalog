/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductForCard } from '../../../types/Product/Product';
import { ICON_PATHS } from '../../constants/IconPaths';
import { useCartFavoritesContext } from '../../hooks/useCartFavoritesContext';

import styles from './ProductCard.module.scss';

type Props = {
  product: ProductForCard;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
    isInCart,
    isInFavorites,
  } = useCartFavoritesContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleToggleFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const inCart = isInCart(product.id);
  const inFavorites = isInFavorites(product.id);

  return (
    <div className={styles.productCard}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCard__link}
      >
        <div className={styles.productCard__imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productCard__image}
          />
        </div>

        <h4 className={styles.productCard__title}>{product.name}</h4>
      </Link>

      <div className={styles.productCard__prices}>
        <span className={styles.productCard__price}>{product.price}$</span>
        <span className={styles.productCard__fullPrice}>
          {product.fullPrice}$
        </span>
      </div>

      <div className={styles.productCard__divider} />

      <div className={styles.productCard__info}>
        <span className={styles.productCard__property}>Screen</span>
        <span className={styles.productCard__value}>{product.screen}</span>

        <span className={styles.productCard__property}>Capacity</span>
        <span className={styles.productCard__value}>{product.capacity}</span>

        <span className={styles.productCard__property}>RAM</span>
        <span className={styles.productCard__value}>{product.ram}</span>
      </div>

      <div className={styles.productCard__actions}>
        <button
          className={`${styles.productCard__button} ${
            inCart ? styles.productCard__button_added : ''
          }`}
          onClick={handleAddToCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.productCard__favButton} ${
            inFavorites ? styles.productCard__favButton_active : ''
          }`}
          onClick={handleToggleFavorites}
        >
          <img
            src={inFavorites ? ICON_PATHS.heartFilled : ICON_PATHS.heart}
            alt="Favorite"
            className={styles.productCard__favIcon}
          />
        </button>
      </div>
    </div>
  );
};
