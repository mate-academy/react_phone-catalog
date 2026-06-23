import React from 'react';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/CartContext/CartContext';
import { Product } from '../../utils/Product';
import classNames from 'classnames';
import styles from './Buttons.module.scss';

type Props = {
  product: Product | null;
  selectedColor?: string | null;
  selectedCapacity?: string | null;
};

export const Buttons: React.FC<Props> = ({
  product,
  selectedColor,
  selectedCapacity,
}) => {
  const favoritesContext = useFavorites();

  if (!favoritesContext) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const { favorites, toggleFavorite } = favoritesContext;

  const cartContext = useCart();

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, addToCart } = cartContext;

  const isFavorite = product ? favorites.some(f => f.id === product.id) : false;
  const isInCart = product ? cart.some(item => item.id === product.id) : false;

  return (
    <div className={styles.productButton}>
      <button
        className={`${styles.productButtonAdd} ${isInCart ? styles.inCart : ''}`}
        onClick={e => {
          e.stopPropagation();
          if (product) {
            addToCart({
              ...product,
              selectedColor: selectedColor ?? undefined,
              selectedCapacity: selectedCapacity ?? undefined,
            });
          }
        }}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={classNames(styles.productButtonFavourite, {
          [styles.productButtonFavouriteActive]: isFavorite,
        })}
        onClick={e => {
          e.stopPropagation();
          if (product) {
            toggleFavorite(product);
          }
        }}
      >
        <img
          src={
            isFavorite
              ? 'img/icons/icon-favourites-filled.svg'
              : 'img/icons/icon-favourites.svg'
          }
          alt="favourites icon"
          className={styles.productButtonIcon}
        />
      </button>
    </div>
  );
};
