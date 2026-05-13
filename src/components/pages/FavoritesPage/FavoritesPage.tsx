import './FavoritesPage.scss';
import React from 'react';
import { useFavorites } from '../../../context/FavoritesContext';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Breadcrumbs } from '../../Breadcrumbs/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <div className="favorites-page__container">
        <Breadcrumbs />

        <h1 className="favorites-page__title">Favourites</h1>
        <p className="favorites-page__count">{`${favorites.length} items`}</p>

        {favorites.length > 0 ? (
          <div className="favorites-page__list">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="favorites-page__empty">Your favorites list is empty</p>
        )}
      </div>
    </div>
  );
};
