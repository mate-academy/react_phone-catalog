import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';

import { CartContext } from '../../modules/shared/context/CartContext';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../modules/shared/context/FavoritesContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  const isInCart = cartContext?.cart.some(item => item.id === product.id);
  const isFavorite = favoritesContext?.favorites.some(
    fav => fav.id === product.id,
  );

  const handleFavoriteClick = () => {
    favoritesContext?.toggleFavorite(product);
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      cartContext?.addToCart(product);
    }
  };

  return (
    <article className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__imageContainer}
      >
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.card__image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__titleLink}
      >
        <h3 className={styles.card__title}>{product.name}</h3>
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.card__priceOld}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider}></div>

      <div className={styles.card__specs}>
        <div className={styles.card__spec}>
          <span className={styles.card__specName}>Screen</span>
          <span className={styles.card__specValue}>{product.screen}</span>
        </div>
        <div className={styles.card__spec}>
          <span className={styles.card__specName}>Capacity</span>
          <span className={styles.card__specValue}>{product.capacity}</span>
        </div>
        <div className={styles.card__spec}>
          <span className={styles.card__specName}>RAM</span>
          <span className={styles.card__specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          className={`${styles.card__btnCart} ${isInCart ? styles['card__btnCart--added'] : ''}`}
          onClick={handleAddToCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.card__btnFav} ${isFavorite ? styles['card__btnFav--active'] : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img
            src={
              isFavorite ? '/icons/heart-filled.svg' : '/icons/heart-empty.svg'
            }
            alt="Favorite icon"
          />
        </button>
      </div>
    </article>
  );
};
