import React from 'react';
import { useCartContext } from '../../CartContext/useCartContext';
import { FavouritesItem } from '../Favourites/Favouritesitem';
import './Favourites.scss';

export const Favourites: React.FC = () => {
  const { favorites, clearFavorites, removeFromFavorites, addToCart } =
    useCartContext();

  return (
    <div className="favourites-page">
      <h2 className="favourites-page__title">Favourites</h2>

      {favorites.length === 0 ?
        <p className="favourites-page__empty">You have no favourite items.</p>
      : <div className="favourites-list">
          {favorites.map((item) => (
            <FavouritesItem
              key={item.id}
              item={item}
              onRemove={() => removeFromFavorites(item.id)}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>
      }

      <div className="buttonClear">
        {favorites.length > 0 && (
          <button
            className="favourites-page__clear"
            onClick={clearFavorites}
          >
            Clear Favourites
          </button>
        )}
      </div>
    </div>
  );
};
