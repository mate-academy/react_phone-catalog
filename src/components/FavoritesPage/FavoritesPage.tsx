import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectFavorites,
  selectFavoritesCount,
} from '../../features/favorites';
import { ProductCard } from '../ProductCard/ProductCard';

export const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(selectFavorites);
  const count = useAppSelector(selectFavoritesCount);

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs__link">
          <div className="home-icon"></div>
        </Link>
        <div className="arrow-icon"></div>
        <p className="breadcrumbs__title">Favourites</p>
      </div>

      <div className="favorites">
        <h1 className="favorites__title">Favourites</h1>
        <p className="favorites__subtitle">{count} Items</p>
        {favorites.length === 0 ? (
          <p className="favorites__empty">Nothing here</p>
        ) : (
          <div className="favorites__list">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
