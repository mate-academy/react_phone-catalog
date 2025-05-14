import React, { useState } from 'react';
import { Gargets } from '../../interface/Gargets';
import { ProductList } from '../ProductPages/ProductList';
import { useCart } from '../CartContext/CartContext';
import '../FavoritesPage/FaviritesPages.scss';
import { NavLink } from 'react-router-dom';

export const FavoritesPages: React.FC = () => {
  const { favoriteItems, removeFavorite } = useCart();
  const [like] = useState(true);

  const handleRemoveFromFavorites = (item: Gargets) => {
    removeFavorite(item.id);
  };

  return (
    <div className="favorites">
      <div className="favorites__nav-bar">
        <NavLink to={'/'} className="favorites__back-home" />
        <div className="favorites__arrow"></div>
        <h2 className="favorites__h2">Favourites</h2>
      </div>

      <h3 className="favorites__h3">Favourites</h3>
      <h4 className="favorites__count-items">{favoriteItems.length} items</h4>

      {favoriteItems.length > 0 ? (
        <div className="favorites__block-item">
          <ProductList
            items={favoriteItems}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            like={like}
          />
        </div>
      ) : (
        <img
          src="/img/product-not-found.png"
          alt="product-empty"
          className="favorites__empty"
        />
      )}
    </div>
  );
};
