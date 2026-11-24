import React from 'react';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductActions.module.scss';

interface Props {
  product: Product;
}

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isInCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={
          isInCart
            ? `${styles.actions__add} ${styles.actions__addSelected}`
            : styles.actions__add
        }
        onClick={() => addToCart(product)}
        disabled={isInCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={
          isFavorite
            ? `${styles.actions__favorite} ${styles.actions__favoriteSelected}`
            : styles.actions__favorite
        }
        onClick={() => toggleFavorite(product)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <img
          src={
            isFavorite
              ? 'images/icons/favorites-selected.png'
              : 'images/icons/favorites-default.png'
          }
          alt=""
          className={styles.actions__icon}
        />
      </button>
    </div>
  );
};
