import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { useStore } from '../../context/StoreContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { products, favorites, isLoading, error, reloadProducts } = useStore();

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <main className={styles.favoritesPage}>
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
      </main>
    );
  }

  return (
    <main className={styles.favoritesPage}>
      <Breadcrumbs currentPage="Favorites" />

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>
        {favoriteProducts.length}{' '}
        {favoriteProducts.length === 1 ? 'item' : 'items'}
      </p>

      {favoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>Your favourites list is empty</h2>

          <p className={styles.emptyText}>
            Add products to favourites and they will appear here.
          </p>
        </div>
      ) : (
        <ProductsList products={favoriteProducts} />
      )}
    </main>
  );
};
