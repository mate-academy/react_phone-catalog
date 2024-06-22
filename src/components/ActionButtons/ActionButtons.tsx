/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext } from 'react';
import styles from './ActionButtons.module.scss';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/const';
import { ProductContext } from '../../context/ProductContext';

interface Props {
  product: Product;
}

const ActionButtons: React.FC<Props> = ({ product }) => {
  const {
    addToFavorite,
    addToCart,
    favorites,
    removeFromFavorite,
    cart,
    removeFromCart,
  } = useContext(ProductContext);
  const isFavorite = favorites.some(fav => fav.id === product.id);
  const isAddToCart = cart.some(item => item.product.id === product.id);

  return (
    <div className={styles.buttons}>
      <button
        // className={styles.buttonCard}
        className={isAddToCart ? styles.buttonCardInCart : styles.buttonCard}
        onClick={() => {
          isAddToCart ? removeFromCart(product.id) : addToCart(product);
        }}
      >
        <p className={styles.buttonText}>
          {isAddToCart ? 'Remove from cart' : 'Add to cart'}
        </p>
      </button>
      <button
        className={styles.buttonFavorite}
        onClick={() => {
          isFavorite ? removeFromFavorite(product.id) : addToFavorite(product);
        }}
      >
        <img
          src={`${BASE_URL}/icons/${
            isFavorite ? 'FavoritesRed' : 'Favorites'
          }.svg`}
          alt="Favorite"
        />
      </button>
    </div>
  );
};

export default ActionButtons;
