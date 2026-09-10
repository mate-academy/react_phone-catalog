import './FavoritesPage.scss';
import ProductCard from '../../shared/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { BarNavigation } from '../PhonesPage/components/BarNavigation/BarNavigation';

export const FavoritesPage = () => {
  const [favorite, setFavorite] = useState([]);

  const refreshCounts = () => {
    const favorites = JSON.parse(localStorage.getItem('FavoriteStore') || '[]');

    setFavorite(favorites);
  };

  useEffect(() => {
    refreshCounts();
    window.addEventListener('favUpdated', refreshCounts);

    window.addEventListener('storage', refreshCounts);

    return () => {
      window.removeEventListener('favUpdated', refreshCounts);
      window.removeEventListener('storage', refreshCounts);
    };
  }, []);

  return (
    <div className="favorite-content">
      <BarNavigation nameCategory="Favorites" />
      <h1 className="text-h1 phones-page__title">Favourites</h1>
      <p className="text-body secondary">{favorite.length} items</p>

      <div className="product-list__main">
        {favorite.map(product => (
          <ProductCard key={product.id} currentProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
