import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Breadcrumbs } from '../CatalogPage/Breadcrumbs/Breadcrumbs';
import { mapProductToCard } from '../../utils/mapProductToCard';

import styles from './FavoritesPage.module.scss';
import { useProducts } from '../../hooks/useProducts';
import { useMemo } from 'react';
import { useFavorites } from '../../context/FavoritesContext';

export const FavoritesPage = () => {
  const { products } = useProducts();
  const { favoriteIds } = useFavorites();

  const favoritesProducts = useMemo(
    () =>
      products
        .filter(product => favoriteIds.includes(product.itemId))
        .map(mapProductToCard),
    [products, favoriteIds],
  );

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />

      <h2 className={styles.title}>Favorites</h2>

      <p className={styles.favoritesCount}>{favoritesProducts.length} items</p>

      {favoritesProducts.length === 0 ? (
        <p className={styles.emptyMessage}>No favorite products yet</p>
      ) : (
        <div className={styles.catalogGrid}>
          {favoritesProducts.map(product => (
            <ProductCard key={product.id} {...product} showDiscount />
          ))}
        </div>
      )}
    </div>
  );
};
