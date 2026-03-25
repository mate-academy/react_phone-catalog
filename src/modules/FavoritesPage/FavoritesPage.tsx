import React, { useMemo } from 'react';
import ProductsList from '../../components/ProductsList/index';
import styles from './FavoritesPage.module.scss';
import { useProducts } from '../../hooks/useProducts';
import { useFavorites } from '../../context/FavoritesContext';

export const FavoritesPage: React.FC = ({}) => {
  const { favorites } = useFavorites();
  const { products, loading, error } = useProducts();

  const favoriteProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return products.filter(p => favorites.includes(String(p.id)));
  }, [products, favorites]);

  return (
    <div className={styles.favoritesPage}>
      <h1 className="title">Favorites Page</h1>
      {favoriteProducts.length === 0 ? (
        <div>There are no favorites yet</div>
      ) : (
        <ProductsList products={favoriteProducts} />
      )}
      {loading && <div>Loading...</div>}
      {error && <div role="alert">Error: {error}</div>}
    </div>
  );
};
