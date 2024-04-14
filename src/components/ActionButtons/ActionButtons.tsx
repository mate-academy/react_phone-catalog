import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types/Product';
import { getFavoritesIconSrc } from '../../servises/iconSrc';
import styles from './ActionButtons.module.scss';

type Props = {
  product: Product;
};

export const ActionButtons: React.FC<Props> = ({ product }) => {
  const {
    addToFavorites,
    removeFromFavorites,
    favorites,
    cart,
    addToCart,
    removeFromCart,
  } = useAppContext();
  const { theme } = useTheme();

  const isFavorite = favorites.some(favProduct => favProduct.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isProductInCart = cart.some(
    cartItem => cartItem.product.id === product.id,
  );

  const handleCartClick = () => {
    if (isProductInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const favoritesIconSrc = () => {
    if (isFavorite) {
      return '../img/icons/SelectedToFaforitesIcon.svg';
    }

    return getFavoritesIconSrc(theme);
  };

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard} onClick={handleCartClick}>
        <p className={styles.buttonText}>
          {isProductInCart ? 'Remove' : 'Add to cart'}
        </p>
      </button>
      <button className={styles.buttonFavorite} onClick={handleFavoriteClick}>
        <img
          className={styles.buttonFavoriteIcon}
          src={favoritesIconSrc()}
          alt="favorite"
        />
      </button>
    </div>
  );
};
