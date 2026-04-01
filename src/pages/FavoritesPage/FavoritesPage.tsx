import { useEffect, useState } from 'react';
import { loadFavorites } from '../../services/favorites';
import { Product } from '../../components/ProductCarousel';
import { Catalog } from '../../components/Catalog';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>(() => loadFavorites());

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(loadFavorites());
    };

    window.addEventListener('favorites-updated', syncFavorites);

    return () => {
      window.removeEventListener('favorites-updated', syncFavorites);
    };
  }, []);

  return (
    <div className="grid">
      <div className="full-width">
        <h1>Favorites</h1>
        <p style={{ color: '#89939A', fontSize: '14px' }}>
          {favorites.length} items
        </p>
      </div>
      <Catalog products={favorites} showFilters={false} infScroll={true} />
    </div>
  );
};
