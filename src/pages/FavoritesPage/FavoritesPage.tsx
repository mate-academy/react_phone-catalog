import { useEffect, useState } from 'react';
import { loadFavorites } from '../../services/favorites';
import { Product } from '../../components/ProductCarousel';
import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import noFavorites from '../../../public/img/product-not-found.png';

import styles from './Favorites.module.scss';

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
        <Breadcrumbs />
        <h1 className="page-title">Favorites</h1>
        {favorites.length !== 0 && (
          <p className="underTitle">{favorites.length} items</p>
        )}
      </div>
      {favorites.length === 0 ? (
        <div className={styles.favorites_empty}>
          <img src={noFavorites} alt="no favorites" />
        </div>
      ) : (
        <Catalog products={favorites} showFilters={false} infScroll={true} />
      )}
    </div>
  );
};
