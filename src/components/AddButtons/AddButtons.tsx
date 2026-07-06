import React, { useContext } from 'react';
import styles from './AddButtons.module.scss';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product | ProductDetails;
};

export const AddButtons: React.FC<Props> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!cartContext || !favoritesContext) {
    throw new Error('Must be used within a CartProvider and FavoritesProvider');
  }

  const { addToCart, cartItems } = cartContext;
  const { favoritesItemsIds, toggleFavorite } = favoritesContext;

  const itemId = 'itemId' in product ? product.itemId : product.namespaceId;
  const isInCart = cartItems.some(item => item.id === itemId);
  const isInFavorites = favoritesItemsIds.some((el: string) => el === itemId);

  return (
    <div className={styles.buttonsBlock}>
      <button
        className={`${styles.addToCart} ${isInCart ? styles.activeCart : ''}`}
        onClick={() => addToCart(product)}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={styles.addToFavourites}
        onClick={() => toggleFavorite(itemId)}
      >
        <img
          src={`/img/icons/${
            isInFavorites ? 'active-fav-icon.svg' : 'fav-icon.svg'
          }`}
          alt="Favourites"
        />
      </button>
    </div>
  );
};
