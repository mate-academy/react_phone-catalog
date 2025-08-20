import React from 'react';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/CartContext/CartContext';
import { Product } from '../../utils/Product';

import './Buttons.scss';

type Props = {
  product: Product | null;
};

export const Buttons: React.FC<Props> = ({ product }) => {
  const favoritesContext = useFavorites();

  if (!favoritesContext) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const { favorites, toggleFavorite } = favoritesContext;

  const cartContext = useCart();

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { addToCart } = cartContext;

  const isFavorite = product ? favorites.some(f => f.id === product.id) : false;

  // const isInCart = product ? cart.some(item => item.id === product.id) : false;

  return (
    <div className="product__button">
      <button
        className="product__button--add"
        onClick={e => {
          e.stopPropagation();
          if (product) {
            addToCart(product);
          }
        }}
      >
        Add to cart
      </button>

      <button
        className={`product__button--favourite ${isFavorite ? 'product__button--active' : ''}`}
        onClick={e => {
          e.stopPropagation();
          if (product) {
            toggleFavorite(product);
          }
        }}
      >
        {isFavorite ? (
          <img
            src="/img/icons/icon-favourites-filled.svg"
            alt="favourites icon"
          />
        ) : (
          <img src="/img/icons/icon-favourites.svg" alt="favourites icon" />
        )}
      </button>
    </div>
  );
};
