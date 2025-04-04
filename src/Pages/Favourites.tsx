import React from 'react';
import { useCartContext } from '../CartContext/useCartContext';
import { CartItem } from './Cart/CartItem';

export const Favourites: React.FC = () => {
  const { favorites, clearFavorites, removeFromFavorites } = useCartContext();

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((phone) => (
        <CartItem
          key={phone.id}
          item={phone}
          quantity={1}
          onRemove={() => removeFromFavorites(phone.id)}
        />
      ))}
      <button
        className="checkout-button"
        onClick={clearFavorites}
      >
        Remove
      </button>
    </div>
  );
};
