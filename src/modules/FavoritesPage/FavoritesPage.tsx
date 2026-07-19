import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { useStore } from '../../context/StoreContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { products, favorites, isLoading, error, reloadProducts } = useStore();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  const favoriteProducts = useMemo(() => {
    return products.filter(product => favorites.includes(product.id));
  }, [favorites, products]);

  const matchedFavoriteProducts = useMemo(() => {
    if (!normalizedQuery) {
      return favoriteProducts;
    }

    return favoriteProducts.filter(product => {
      return product.name.toLocaleLowerCase().includes(normalizedQuery);
    });
  }, [favoriteProducts, normalizedQuery]);

  const favoritesCount = favoriteProducts.length;

  if (isLoading) {
    return (
      <section className={styles.favoritesPage}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.favoritesPage}>
        <div className={styles.message}>
          <p className={styles.messageText}>{error}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={reloadProducts}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.favoritesPage}>
      <Breadcrumbs currentPage="Favorites" />

      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>
        {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
      </p>

      {favoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>You have no favorite products yet</p>

          <p className={styles.emptyText}>
            Add products to favorites by clicking the heart button.
          </p>
        </div>
      ) : matchedFavoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            No favorite products match the query
          </p>

          <p className={styles.emptyText}>
            Try changing or clearing the search query.
          </p>
        </div>
      ) : (
        <ProductsList products={matchedFavoriteProducts} />
      )}
    </section>
  );
};
